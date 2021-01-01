import prefresh from "@prefresh/vite";
import { resolve } from "path";
import { defineConfig } from "vite";

const dirname = new URL(".", import.meta.url).pathname;

export default defineConfig({
  root: "src",
  base: "./",
  publicDir: resolve(dirname, "static"),
  clearScreen: false,
  esbuild: {
    legalComments: "none",
    jsx: "automatic",
    jsxImportSource: "preact",
  },
  build: {
    outDir: resolve(dirname, "public"),
    emptyOutDir: true,
    target: ["chrome126", "firefox115"],
    assetsInlineLimit: 0,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1024 * 1024,
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        entryFileNames: "[hash].js",
        assetFileNames: "[hash][extname]",
        chunkFileNames: "[hash].js",
      },
    },
  },
  resolve: {
    alias: [
      { find: "react", replacement: "preact/compat" },
      { find: "react-dom/test-utils", replacement: "preact/test-utils" },
      { find: "react-dom", replacement: "preact/compat" },
      { find: "react/jsx-runtime", replacement: "preact/jsx-runtime" },
    ],
  },
  plugins: [prefresh()],
});
