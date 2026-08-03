const SELECTOR_PARTS = /[^a-zA-Z0-9_-]/g;

const getElementLabel = (element) => {
  if (!element) return "Nothing selected";

  const tag = element.tagName.toLowerCase();
  const id = element.id ? `#${element.id.replace(SELECTOR_PARTS, "")}` : "";
  const classes = [...element.classList]
    .filter((name) => !name.startsWith("is-"))
    .slice(0, 2)
    .map((name) => `.${name}`)
    .join("");

  return `${tag}${id}${classes}`;
};

const formatBox = (style, prefix) => {
  const values = ["Top", "Right", "Bottom", "Left"].map((side) =>
    Math.round(Number.parseFloat(style[`${prefix}${side}`]) || 0)
  );

  if (values.every((value) => value === values[0])) return `${values[0]}px`;
  if (values[0] === values[2] && values[1] === values[3]) {
    return `${values[0]}px ${values[1]}px`;
  }

  return values.map((value) => `${value}px`).join(" ");
};

const fallbackCopy = (text) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
};

const copyText = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  fallbackCopy(text);
};

const makeRulerTicks = (element, length, axis) => {
  const fragment = document.createDocumentFragment();

  for (let position = 0; position <= length; position += 8) {
    const tick = document.createElement("span");
    const isMajor = position % 32 === 0;
    const isLabel = position % 64 === 0;

    tick.className = `inspect-tick${isMajor ? " inspect-tick--major" : ""}`;
    tick.style.setProperty("--tick-position", `${position}px`);
    tick.dataset.axis = axis;

    if (isLabel) {
      const label = document.createElement("b");
      label.textContent = String(position);
      tick.append(label);
    }

    fragment.append(tick);
  }

  element.replaceChildren(fragment);
};

export function setupEffectDocs({ snippets, initialSnippet = "html", initialView = "preview" }) {
  const viewTabs = [...document.querySelectorAll("[data-view]")];
  const panels = [...document.querySelectorAll("[data-panel]")];
  const snippetTabs = [...document.querySelectorAll("[data-snippet]")];
  const codeOutput = document.querySelector("[data-code-output]");
  const copyCodeButton = document.querySelector("[data-copy-code]");
  const copyStatus = document.querySelector("[data-copy-status]");
  const inspectButton = document.querySelector("[data-inspect-toggle]");
  const inspectFrame = document.querySelector("[data-inspect-frame]");
  const inspectScope = document.querySelector("[data-inspect-scope]");
  const inspectOverlay = document.querySelector("[data-inspect-overlay]");
  const inspectBox = document.querySelector("[data-inspect-box]");
  const inspectTooltip = document.querySelector("[data-inspect-tooltip]");
  const rulerX = document.querySelector("[data-ruler-x]");
  const rulerY = document.querySelector("[data-ruler-y]");
  const inspectOnly = [...document.querySelectorAll("[data-inspect-only]")];

  let activeView = initialView;
  let activeSnippet = initialSnippet;
  let inspecting = false;
  let selectedElement = null;
  let copiedTimer;

  const getActiveCode = () => {
    const source = snippets[activeSnippet];
    return typeof source === "function" ? source() : source;
  };

  const renderCode = () => {
    if (!codeOutput) return;
    codeOutput.textContent = getActiveCode();
    if (copyStatus) copyStatus.textContent = `${activeSnippet.toUpperCase()} · ready to copy`;
  };

  const setInspectMetrics = (element) => {
    if (!element || !inspectFrame) return;

    const rect = element.getBoundingClientRect();
    const frameRect = inspectFrame.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return;
    const style = window.getComputedStyle(element);
    const label = getElementLabel(element);
    const metrics = {
      selector: label,
      size: `${Math.round(rect.width)} × ${Math.round(rect.height)}`,
      display: style.display,
      padding: formatBox(style, "padding"),
      margin: formatBox(style, "margin")
    };

    Object.entries(metrics).forEach(([name, value]) => {
      document.querySelectorAll(`[data-metric="${name}"]`).forEach((node) => {
        node.textContent = value;
      });
    });

    if (!inspecting || !inspectBox || !inspectTooltip) return;

    const left = rect.left - frameRect.left;
    const top = rect.top - frameRect.top;
    inspectBox.style.transform = `translate3d(${left}px, ${top}px, 0)`;
    inspectBox.style.width = `${rect.width}px`;
    inspectBox.style.height = `${rect.height}px`;

    inspectTooltip.querySelector("strong").textContent = label;
    inspectTooltip.querySelector("span").textContent = `${metrics.display} · ${metrics.size}px`;

    const tooltipWidth = Math.min(238, frameRect.width - 24);
    const tooltipLeft = Math.max(12, Math.min(left, frameRect.width - tooltipWidth - 12));
    const tooltipTop = top > 86 ? top - 62 : Math.min(frameRect.height - 62, top + rect.height + 10);
    inspectTooltip.style.width = `${tooltipWidth}px`;
    inspectTooltip.style.transform = `translate3d(${tooltipLeft}px, ${tooltipTop}px, 0)`;
  };

  const inspectAtPoint = (event) => {
    if (!inspecting || !inspectScope || !inspectOverlay) return;

    const candidate = document
      .elementsFromPoint(event.clientX, event.clientY)
      .find(
        (element) =>
          inspectScope.contains(element) &&
          element !== inspectScope &&
          !inspectOverlay.contains(element) &&
          !element.closest("[data-inspect-ignore]")
      );

    if (!candidate) return;
    selectedElement = candidate;
    setInspectMetrics(candidate);
  };

  const renderRulers = () => {
    if (!inspectFrame || !rulerX || !rulerY) return;
    makeRulerTicks(rulerX, inspectFrame.clientWidth, "x");
    makeRulerTicks(rulerY, inspectFrame.clientHeight, "y");
  };

  const setInspect = (nextValue) => {
    inspecting = Boolean(nextValue) && activeView === "preview";
    inspectButton?.classList.toggle("is-active", inspecting);
    inspectButton?.setAttribute("aria-pressed", String(inspecting));
    inspectFrame?.classList.toggle("is-inspecting", inspecting);
    if (inspectOverlay) inspectOverlay.hidden = !inspecting;

    if (inspecting) {
      renderRulers();
      selectedElement ||=
        inspectScope?.querySelector("[data-inspect-default]") ??
        inspectScope?.querySelector(".folder-variant.is-selected .folder") ??
        inspectScope?.firstElementChild ??
        inspectScope;
      setInspectMetrics(selectedElement);
    }
  };

  const setView = (nextView) => {
    activeView = nextView;

    viewTabs.forEach((tab) => {
      const isActive = tab.dataset.view === activeView;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== activeView;
    });

    inspectOnly.forEach((element) => {
      element.hidden = activeView !== "preview";
    });

    if (activeView !== "preview") setInspect(false);
    if (activeView === "code") renderCode();
  };

  const setSnippet = (nextSnippet) => {
    activeSnippet = nextSnippet;
    snippetTabs.forEach((tab) => {
      const isActive = tab.dataset.snippet === activeSnippet;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });
    renderCode();
  };

  const reportCopied = (button, label, lineCount) => {
    window.clearTimeout(copiedTimer);
    const original = button.dataset.defaultLabel || button.textContent.trim();
    button.dataset.defaultLabel = original;
    button.classList.add("is-copied");
    button.querySelector("[data-copy-label]")
      ? (button.querySelector("[data-copy-label]").textContent = "Copied")
      : (button.textContent = "Copied");
    if (copyStatus) copyStatus.textContent = `${lineCount} ${lineCount === 1 ? "line" : "lines"} copied`;

    copiedTimer = window.setTimeout(() => {
      button.classList.remove("is-copied");
      button.querySelector("[data-copy-label]")
        ? (button.querySelector("[data-copy-label]").textContent = label)
        : (button.textContent = original);
      renderCode();
    }, 1700);
  };

  const runCopy = async (button, text, label = "Copy code") => {
    try {
      await copyText(text);
      reportCopied(button, label, text.split("\n").length);
    } catch {
      if (copyStatus) copyStatus.textContent = "Copy failed · select the code manually";
    }
  };

  viewTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => setView(tab.dataset.view));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault();
      const delta = event.key === "ArrowRight" ? 1 : -1;
      viewTabs[(index + delta + viewTabs.length) % viewTabs.length].click();
      viewTabs[(index + delta + viewTabs.length) % viewTabs.length].focus();
    });
  });

  snippetTabs.forEach((tab) => {
    tab.addEventListener("click", () => setSnippet(tab.dataset.snippet));
  });

  inspectButton?.addEventListener("click", () => setInspect(!inspecting));
  inspectScope?.addEventListener("pointermove", inspectAtPoint);
  copyCodeButton?.addEventListener("click", () => runCopy(copyCodeButton, getActiveCode()));

  document.querySelectorAll("[data-copy-text]").forEach((button) => {
    button.addEventListener("click", () =>
      runCopy(button, button.dataset.copyText, button.dataset.copyLabel || "Copy")
    );
  });

  const resizeObserver = new ResizeObserver(() => {
    renderRulers();
    if (selectedElement) setInspectMetrics(selectedElement);
  });
  if (inspectFrame) resizeObserver.observe(inspectFrame);

  setSnippet(initialSnippet);
  setView(initialView);

  return {
    refreshCode: renderCode,
    inspectElement(element) {
      selectedElement = element;
      setInspectMetrics(element);
    }
  };
}
