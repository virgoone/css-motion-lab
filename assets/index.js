import { effects } from "../effects/registry.js";

document.querySelectorAll("[data-effect-count]").forEach((element) => {
  element.textContent = `${effects.length} ${effects.length === 1 ? "study" : "studies"} available`;
});
