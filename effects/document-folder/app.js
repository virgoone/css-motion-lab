import documentFolderCss from "./document-folder.css?raw";
import { getEffect } from "../registry.js";
import { setupEffectDocs } from "../shared/docs-shell.js";

const effect = getEffect("document-folder");
const cssSnippet = documentFolderCss.trim();

const htmlSnippet = `<div
  class="document-folder"
  tabindex="0"
  role="group"
  aria-label="Interactive postage document folder"
>
  <span class="document-folder__scene">
    <span class="document-folder__back" aria-hidden="true">
      <span class="document-folder__pocket"></span>
    </span>

    <span class="postage-stack">
      <button class="postage postage--rear" type="button" aria-label="Reveal Island Mail stamp">
        <span class="postage__field">
          <span class="postage__island-title">ISLAND<br />MAIL</span>
          <span class="postage__island-mark"></span>
        </span>
      </button>

      <button class="postage postage--front" type="button" aria-label="Lift Quiet Hours stamp">
        <span class="postage__field">
          <span class="postage__vertical">静かな時間</span>
          <span class="postage__bird"></span>
          <span class="postage__country">NIPPON</span>
          <span class="postage__value">63</span>
        </span>
      </button>
    </span>

    <span class="document-folder__panel document-folder__panel--left" aria-hidden="true">
      <span class="document-folder__mark"><i></i></span>
      <span class="document-folder__meta">
        <span>Stamp collection</span>
        <small>02 total</small>
      </span>
    </span>

    <span class="document-folder__panel document-folder__panel--right" aria-hidden="true">
      <span class="document-folder__index">ARCHIVE / 01</span>
    </span>
  </span>
</div>`;

const fullPageSnippet = `<!doctype html>
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
  background: #f7f7f4;
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
