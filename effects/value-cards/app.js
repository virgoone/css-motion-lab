import valueCardsCss from "./value-cards.css?raw";
import { getEffect } from "../registry.js";
import { setupEffectDocs } from "../shared/docs-shell.js";

const effect = getEffect("value-cards");
const cssSnippet = valueCardsCss.trim();

const htmlSnippet = `<div class="value-deck" aria-label="Company values">
  <button class="value-card" type="button" aria-label="Craft value card">
    <span class="value-card__art" aria-hidden="true">
      <span class="spirit spirit--craft"><span class="spirit__eyes"></span></span>
      <span class="spirit-prop spirit-prop--diamond"></span>
    </span>
    <span class="value-card__title">Craft</span>
    <span class="value-card__copy">We take pride in craft, attention to detail, resourcefulness, and meaningful progress.</span>
  </button>

  <button class="value-card" type="button" aria-label="Accountability value card">
    <span class="value-card__art" aria-hidden="true">
      <span class="spirit spirit--accountability"><span class="spirit__eyes"></span></span>
      <span class="spirit-prop spirit-prop--spark"></span>
    </span>
    <span class="value-card__title">Accountability</span>
    <span class="value-card__copy">We take responsibility for our decisions, actions, and results as one team.</span>
  </button>

  <button class="value-card" type="button" aria-label="Sisu value card">
    <span class="value-card__art" aria-hidden="true">
      <span class="spirit spirit--sisu"><span class="spirit__eyes"></span></span>
      <span class="spirit-prop spirit-prop--hat"></span>
      <span class="spirit-prop spirit-prop--flower"></span>
    </span>
    <span class="value-card__title">Sisu</span>
    <span class="value-card__copy">We cultivate inner strength and persevere in the face of obstacles.</span>
  </button>

  <button class="value-card" type="button" aria-label="Integrity value card">
    <span class="value-card__art" aria-hidden="true">
      <span class="spirit spirit--integrity"><span class="spirit__eyes"></span></span>
      <span class="spirit-prop spirit-prop--flag-pole"></span>
      <span class="spirit-prop spirit-prop--flag"></span>
    </span>
    <span class="value-card__title">Integrity</span>
    <span class="value-card__copy">We count on each other to be direct, honest, caring, and consistent.</span>
  </button>

  <button class="value-card" type="button" aria-label="Community value card">
    <span class="value-card__art" aria-hidden="true">
      <span class="spirit spirit--community-a"><span class="spirit__eyes"></span></span>
      <span class="spirit spirit--community-b"><span class="spirit__eyes"></span></span>
    </span>
    <span class="value-card__title">Community</span>
    <span class="value-card__copy">We create products that increase access and engender human connection.</span>
  </button>
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
  overflow-x: auto;
  place-items: center;
  background: #f7f7fa;
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
