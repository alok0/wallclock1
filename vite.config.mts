import prefresh from "@prefresh/vite";
import { execSync } from "child_process";
import { writeFile } from "fs/promises";
import { resolve } from "path";
import { defineConfig } from "vite";

const dirname = new URL(".", import.meta.url).pathname;

export default defineConfig((env) => {
  const version =
    env.command === "build"
      ? String(
          execSync("git describe --tags --always --dirty", {
            cwd: dirname,
            encoding: "utf-8",
          }),
        ).trim()
      : "";

  return defineConfig({
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
      target: ["chrome132", "firefox128"],
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
    define: {
      __VERSION__: JSON.stringify(version),
    },
    resolve: {
      alias: [
        { find: "react", replacement: "preact/compat" },
        { find: "react-dom/test-utils", replacement: "preact/test-utils" },
        { find: "react-dom", replacement: "preact/compat" },
        { find: "react/jsx-runtime", replacement: "preact/jsx-runtime" },
      ],
    },
    server: {
      allowedHosts: true,
    },
    plugins: [
      prefresh(),
      {
        name: "version output",
        apply: "build",
        buildEnd: () =>
          void setTimeout(() => {
            void writeFile(resolve(dirname, "public", "version.txt"), version);
            console.log({ version });
          }, 1000),
      },
    ],
  });
});
