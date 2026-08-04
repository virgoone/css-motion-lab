import progressPillsCss from "./progress-pills.css?raw";
import { getEffect } from "../registry.js";
import { setupEffectDocs } from "../shared/docs-shell.js";

const effect = getEffect("progress-pills");
const cssSnippet = progressPillsCss.trim();

const htmlSnippet = `<div class="progress-pills" aria-label="Animated task progress">
  <div class="progress-pill progress-pill--model" role="progressbar" aria-label="Model training, animated progress">
    <span class="progress-pill__fill" aria-hidden="true"></span>
    <span class="progress-pill__edge" aria-hidden="true">
      <svg viewBox="0 0 96 180" preserveAspectRatio="none">
        <path class="progress-pill__edge-fill" d="M0 0H56C52 15 71 25 56 39C40 52 72 61 54 75C38 88 72 97 54 111C37 125 70 135 52 149C43 160 57 170 54 180H0Z" />
        <path class="progress-pill__edge-glow" d="M56 0C52 15 71 25 56 39C40 52 72 61 54 75C38 88 72 97 54 111C37 125 70 135 52 149C43 160 57 170 54 180" />
        <path class="progress-pill__edge-line" d="M56 0C52 15 71 25 56 39C40 52 72 61 54 75C38 88 72 97 54 111C37 125 70 135 52 149C43 160 57 170 54 180" />
      </svg>
    </span>
    <span class="progress-pill__copy"><strong>MODEL TRAINING*</strong><span>SHA 4.5 + 100 2026 TKN</span></span>
    <span class="progress-pill__value" aria-hidden="true"></span>
  </div>

  <div class="progress-pill progress-pill--agent" role="progressbar" aria-label="Agent migration, animated progress">
    <span class="progress-pill__fill" aria-hidden="true"></span>
    <span class="progress-pill__edge" aria-hidden="true">
      <svg viewBox="0 0 96 180" preserveAspectRatio="none">
        <path class="progress-pill__edge-fill" d="M0 0H58C51 18 59 31 49 45C40 57 69 69 51 82C39 94 67 108 50 121C39 134 65 146 51 158C45 167 58 176 56 180H0Z" />
        <path class="progress-pill__edge-glow" d="M58 0C51 18 59 31 49 45C40 57 69 69 51 82C39 94 67 108 50 121C39 134 65 146 51 158C45 167 58 176 56 180" />
        <path class="progress-pill__edge-line" d="M58 0C51 18 59 31 49 45C40 57 69 69 51 82C39 94 67 108 50 121C39 134 65 146 51 158C45 167 58 176 56 180" />
      </svg>
    </span>
    <span class="progress-pill__copy"><strong>AGENT MIGRATION*</strong><span>TRANSFERRING PROTOCOL</span></span>
    <span class="progress-pill__value" aria-hidden="true"></span>
  </div>

  <div class="progress-pill progress-pill--visual" role="progressbar" aria-label="Visual training, animated progress">
    <span class="progress-pill__fill" aria-hidden="true"></span>
    <span class="progress-pill__edge" aria-hidden="true">
      <svg viewBox="0 0 96 180" preserveAspectRatio="none">
        <path class="progress-pill__edge-fill" d="M0 0H60C55 17 66 27 55 41C44 54 70 65 55 79C42 91 69 103 54 117C42 129 66 143 53 155C45 166 61 174 58 180H0Z" />
        <path class="progress-pill__edge-glow" d="M60 0C55 17 66 27 55 41C44 54 70 65 55 79C42 91 69 103 54 117C42 129 66 143 53 155C45 166 61 174 58 180" />
        <path class="progress-pill__edge-line" d="M60 0C55 17 66 27 55 41C44 54 70 65 55 79C42 91 69 103 54 117C42 129 66 143 53 155C45 166 61 174 58 180" />
      </svg>
    </span>
    <span class="progress-pill__copy"><strong>VISUAL TRAINING*</strong><span>GENERATING POWER ++</span></span>
    <span class="progress-pill__value" aria-hidden="true"></span>
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
  display: grid;
  min-width: 320px;
  min-height: 100dvh;
  margin: 0;
  place-items: center;
  background: #f7f7f5;
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
