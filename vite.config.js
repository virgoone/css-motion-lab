import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL("./index.html", import.meta.url)),
        folder: fileURLToPath(new URL("./effects/folder/index.html", import.meta.url))
      }
    }
  },
  root: projectRoot
});
