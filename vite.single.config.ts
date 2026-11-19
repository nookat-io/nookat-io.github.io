import { defineConfig, mergeConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import baseConfig from "./vite.config";

// Production build for GitHub Pages: JS, CSS and fonts are inlined into
// dist/index.html, and everything in public/ is copied next to it.
export default mergeConfig(
  baseConfig,
  defineConfig({
    base: "./",
    plugins: [viteSingleFile()],
  }),
);
