import themeSwitcherCss from "./theme-switcher.css?raw";
import { getEffect } from "../registry.js";
import { setupEffectDocs } from "../shared/docs-shell.js";

const effect = getEffect("theme-switcher");
const cssSnippet = themeSwitcherCss.trim();

const moonIcon = `<svg viewBox="0 0 64 64" aria-hidden="true">
  <path d="M47 39.5A22.5 22.5 0 0 1 20 8a22 22 0 1 0 27 31.5Z" />
  <path d="M43 9v8M39 13h8M54 20v7M50.5 23.5h7" />
</svg>`;

const sunIcon = `<svg viewBox="0 0 64 64" aria-hidden="true">
  <circle cx="32" cy="32" r="12" />
  <path d="M32 7v7M32 50v7M7 32h7M50 32h7M14.3 14.3l5 5M44.7 44.7l5 5M49.7 14.3l-5 5M19.3 44.7l-5 5" />
</svg>`;

const htmlSnippet = `<div class="theme-switcher-demo">
  <div class="theme-switcher">
    <input
      class="theme-switcher__input"
      id="theme-mode"
      type="checkbox"
      role="switch"
      aria-label="Use light theme"
    />
    <label class="theme-switcher__control" for="theme-mode">
      <span class="theme-switcher__lens" aria-hidden="true"></span>
      <span class="theme-switcher__option theme-switcher__option--moon">
${moonIcon
  .split("\n")
  .map((line) => `        ${line}`)
  .join("\n")}
      </span>
      <span class="theme-switcher__option theme-switcher__option--sun">
${sunIcon
  .split("\n")
  .map((line) => `        ${line}`)
  .join("\n")}
      </span>
      <span class="theme-switcher__indicator" aria-hidden="true"></span>
    </label>
  </div>
</div>`;

const fullPageSnippet = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${effect.title}</title>
    <style>
body {
  min-width: 320px;
  min-height: 100dvh;
  margin: 0;
}

${cssSnippet}
    </style>
  </head>
  <body>
${htmlSnippet
  .split("\n")
  .map((line) => `    ${line}`)
  .join("\n")}
  </body>
</html>`;

const docs = setupEffectDocs({
  snippets: {
    html: htmlSnippet,
    css: cssSnippet,
    full: fullPageSnippet
  }
});

docs.inspectElement(document.querySelector("[data-inspect-default]"));
