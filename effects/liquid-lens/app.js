import liquidLensCss from "./liquid-lens.css?raw";
import liquidLensJs from "./liquid-lens.js?raw";
import "./liquid-lens.js";
import { getEffect } from "../registry.js";
import { setupEffectDocs } from "../shared/docs-shell.js";

const effect = getEffect("liquid-lens");
document.documentElement.dataset.effectReady = effect.slug;
const sourceRoot = document.querySelector("[data-liquid-lens-interactive]").cloneNode(true);
sourceRoot.removeAttribute("data-inspect-default");
sourceRoot.querySelector(".liquid-lens")?.removeAttribute("style");
sourceRoot.querySelector(".liquid-lens")?.removeAttribute("data-liquid-ready");
sourceRoot.querySelector(".liquid-lens")?.removeAttribute("aria-valuetext");

const htmlSnippet = sourceRoot.outerHTML.trim();
const cssSnippet = liquidLensCss.trim();
const jsSnippet = liquidLensJs.trim();

const fullPageSnippet = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${effect.title}</title>
    <style>
body {
  display: grid;
  min-width: 320px;
  min-height: 100dvh;
  margin: 0;
  place-items: center;
  background: #151614;
  font-family: "Geist", "Avenir Next", Arial, sans-serif;
}

${cssSnippet}
    </style>
  </head>
  <body>
${htmlSnippet
  .split("\n")
  .map((line) => `    ${line}`)
  .join("\n")}
    <script type="module">
${jsSnippet
  .split("\n")
  .map((line) => `      ${line}`)
  .join("\n")}
    </script>
  </body>
</html>`;

const docs = setupEffectDocs({
  snippets: {
    html: htmlSnippet,
    css: cssSnippet,
    js: jsSnippet,
    full: fullPageSnippet
  }
});

docs.inspectElement(document.querySelector("[data-inspect-default]"));
