const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export function setupLiquidLens(root) {
  const scene = root?.querySelector(".liquid-lens__scene");
  const lens = root?.querySelector(".liquid-lens");
  if (!scene || !lens || lens.dataset.liquidReady === "true") return;

  lens.dataset.liquidReady = "true";
  let position = { x: -80, y: 24 };
  let nextPoint = null;
  let frame = 0;

  const limits = () => {
    const sceneRect = scene.getBoundingClientRect();
    const lensRect = lens.getBoundingClientRect();
    return {
      x: Math.max(0, (sceneRect.width - lensRect.width) / 2 - 10),
      y: Math.max(0, (sceneRect.height - lensRect.height) / 2 - 10)
    };
  };

  const render = (x, y) => {
    const limit = limits();
    position = {
      x: clamp(x, -limit.x, limit.x),
      y: clamp(y, -limit.y, limit.y)
    };
    lens.style.setProperty("--lens-x", `${position.x}px`);
    lens.style.setProperty("--lens-y", `${position.y}px`);
    lens.setAttribute("aria-valuetext", `Lens at ${Math.round(position.x)}, ${Math.round(position.y)}`);
  };

  const renderPointer = () => {
    frame = 0;
    if (!nextPoint) return;
    const rect = scene.getBoundingClientRect();
    render(nextPoint.x - rect.left - rect.width / 2, nextPoint.y - rect.top - rect.height / 2);
  };

  const queuePointer = (event) => {
    nextPoint = { x: event.clientX, y: event.clientY };
    if (!frame) frame = requestAnimationFrame(renderPointer);
  };

  lens.addEventListener("pointerdown", (event) => {
    lens.setPointerCapture(event.pointerId);
    lens.classList.add("is-dragging");
    queuePointer(event);
  });

  lens.addEventListener("pointermove", (event) => {
    if (!lens.hasPointerCapture(event.pointerId)) return;
    queuePointer(event);
  });

  const release = (event) => {
    if (lens.hasPointerCapture(event.pointerId)) lens.releasePointerCapture(event.pointerId);
    lens.classList.remove("is-dragging");
  };

  lens.addEventListener("pointerup", release);
  lens.addEventListener("pointercancel", release);

  lens.addEventListener("keydown", (event) => {
    const direction = {
      ArrowLeft: [-14, 0],
      ArrowRight: [14, 0],
      ArrowUp: [0, -14],
      ArrowDown: [0, 14]
    }[event.key];

    if (event.key === "Home") {
      event.preventDefault();
      render(0, 0);
      return;
    }

    if (!direction) return;
    event.preventDefault();
    render(position.x + direction[0], position.y + direction[1]);
  });

  const resizeObserver = new ResizeObserver(() => render(position.x, position.y));
  resizeObserver.observe(scene);
  render(position.x, position.y);
}

document.querySelectorAll("[data-liquid-lens-interactive]").forEach(setupLiquidLens);
