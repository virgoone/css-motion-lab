import folderCss from "./folder.css?raw";

const codeOutput = document.querySelector("#code-output");
const copyButton = document.querySelector("#copy-button");
const copyStatus = document.querySelector("#copy-status");
const liveFolder = document.querySelector("#live-folder");
const tabs = [...document.querySelectorAll("[data-snippet]")];
const themeOptions = [...document.querySelectorAll("[data-theme]")];

let activeSnippet = "html";
let activeTheme = "amber";
const cssSnippet = folderCss.trim();
let copiedTimer;

const getHtmlSnippet = () => `<button
  class="folder folder--${activeTheme}"
  type="button"
  aria-label="Preview the Folder Pocket interaction"
>
  <span class="folder__object" aria-hidden="true">
    <span class="folder__back"></span>
    <span class="folder__papers">
      <span class="paper paper--rear"></span>
      <span class="paper paper--left"></span>
      <span class="paper paper--right"></span>
    </span>
    <span class="folder__front">
      <span class="folder__label">
        <span>Design Folder</span>
        <small>45 files</small>
      </span>
    </span>
  </span>
</button>`;

const getFullPageSnippet = () => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Folder Pocket</title>
    <style>
body {
  display: grid;
  min-height: 100dvh;
  margin: 0;
  place-items: center;
  background: #eeefeb;
}

${cssSnippet}
    </style>
  </head>
  <body>
${getHtmlSnippet()
  .split("\n")
  .map((line) => `    ${line}`)
  .join("\n")}
  </body>
</html>`;

const getActiveCode = () => {
  if (activeSnippet === "css") return cssSnippet;
  if (activeSnippet === "full") return getFullPageSnippet();
  return getHtmlSnippet();
};

const renderCode = () => {
  codeOutput.textContent = getActiveCode();
  copyStatus.textContent = `${activeSnippet.toUpperCase()} ready to copy`;
};

const selectSnippet = (nextSnippet) => {
  activeSnippet = nextSnippet;

  tabs.forEach((tab) => {
    const isActive = tab.dataset.snippet === activeSnippet;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  renderCode();
};

const selectTheme = (nextTheme) => {
  liveFolder.classList.remove(`folder--${activeTheme}`);
  activeTheme = nextTheme;
  liveFolder.classList.add(`folder--${activeTheme}`);

  themeOptions.forEach((option) => {
    const isActive = option.dataset.theme === activeTheme;
    option.classList.toggle("is-active", isActive);
    option.setAttribute("aria-pressed", String(isActive));
  });

  renderCode();
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

const copyActiveCode = async () => {
  const text = getActiveCode();

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      fallbackCopy(text);
    }

    window.clearTimeout(copiedTimer);
    copyButton.classList.add("is-copied");
    copyButton.querySelector("span").textContent = "Copied";
    copyStatus.textContent = `${text.split("\n").length} lines copied`;

    copiedTimer = window.setTimeout(() => {
      copyButton.classList.remove("is-copied");
      copyButton.querySelector("span").textContent = "Copy code";
      renderCode();
    }, 1800);
  } catch {
    copyStatus.textContent = "Copy failed. Select the code and copy manually.";
  }
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => selectSnippet(tab.dataset.snippet));
});

themeOptions.forEach((option) => {
  option.addEventListener("click", () => selectTheme(option.dataset.theme));
});

copyButton.addEventListener("click", copyActiveCode);

renderCode();
