import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));
const effectsRoot = fileURLToPath(new URL("./effects", import.meta.url));
const effectInputs = Object.fromEntries(
  readdirSync(effectsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== "shared")
    .map((entry) => [
      entry.name,
      fileURLToPath(new URL(`./effects/${entry.name}/index.html`, import.meta.url))
    ])
);

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL("./index.html", import.meta.url)),
        ...effectInputs
      }
    }
  },
  root: projectRoot
});
