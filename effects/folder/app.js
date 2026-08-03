import folderCss from "./folder.css?raw";
import { getEffect } from "../registry.js";
import { setupEffectDocs } from "../shared/docs-shell.js";

const effect = getEffect("folder");
const themeOptions = [...document.querySelectorAll("[data-theme]")];
const previewFolders = [...document.querySelectorAll("[data-preview-theme]")];
const activeCaption = document.querySelector("[data-active-caption]");

let activeTheme = "amber";
let docs;
const cssSnippet = folderCss.trim();

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
    <title>${effect.title}</title>
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

const selectTheme = (nextTheme) => {
  activeTheme = nextTheme;

  themeOptions.forEach((option) => {
    const isActive = option.dataset.theme === activeTheme;
    option.classList.toggle("is-active", isActive);
    option.setAttribute("aria-pressed", String(isActive));
  });

  previewFolders.forEach((folder) => {
    const isActive = folder.dataset.previewTheme === activeTheme;
    folder.closest(".folder-variant").classList.toggle("is-selected", isActive);
    folder.setAttribute("aria-pressed", String(isActive));
    if (isActive) docs?.inspectElement(folder);
  });

  if (activeCaption) {
    activeCaption.textContent = `${activeTheme[0].toUpperCase()}${activeTheme.slice(1)} selected for copied HTML`;
  }

  docs?.refreshCode();
};

docs = setupEffectDocs({
  snippets: {
    html: getHtmlSnippet,
    css: cssSnippet,
    full: getFullPageSnippet
  }
});

themeOptions.forEach((option) => {
  option.addEventListener("click", () => selectTheme(option.dataset.theme));
});

previewFolders.forEach((folder) => {
  folder.addEventListener("click", () => selectTheme(folder.dataset.previewTheme));
});

selectTheme(activeTheme);
