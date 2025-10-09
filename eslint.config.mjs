// @ts-check

import eslintReactUnified from "@eslint-react/eslint-plugin";
import eslint from "@eslint/js";
import prettierPlugin from "eslint-config-prettier";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import promisePlugin from "eslint-plugin-promise";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import path from "node:path";
import tseslint from "typescript-eslint";

const dirname = path.resolve(new URL(".", import.meta.url).pathname);

/**
 * @template T
 * @param {T|undefined|null|0|false|""} v
 * @returns {T}
 */
const requireTruthy = (v) => {
  if (!v) {
    throw new Error("required value not present");
  }
  return v;
};

const commonConfigs = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  {
    ...promisePlugin.configs.recommended,
    plugins: { promise: promisePlugin },
  },
  prettierPlugin,
);

export default tseslint.config(
  {
    extends: [
      ...tseslint.configs.recommendedTypeCheckedOnly,
      {
        languageOptions: {
          parserOptions: {
            project: true,
            tsconfigDirName: dirname,
          },
        },
      },
      ...commonConfigs,
      {
        ...requireTruthy(reactPlugin.configs.flat["jsx-runtime"]),
        settings: { react: { version: "detect" } },
      },
      eslintReactUnified.configs["recommended-type-checked"],
      requireTruthy(reactHooksPlugin.configs.flat["recommended-latest"]),
      jsxA11yPlugin.flatConfigs.recommended,
      {
        rules: {
          "react/display-name": "off",
          "react/prop-types": "off",
          "@eslint-react/no-use-context": "off",
        },
      },
      {
        rules: {
          "@typescript-eslint/no-unsafe-argument": "warn",
          "@typescript-eslint/no-unsafe-assignment": "warn",
          "@typescript-eslint/no-unsafe-call": "warn",
          "@typescript-eslint/no-unsafe-declaration-merging": "warn",
          "@typescript-eslint/no-unsafe-enum-comparison": "warn",
          "@typescript-eslint/no-unsafe-function-type": "warn",
          "@typescript-eslint/no-unsafe-member-access": "warn",
          "@typescript-eslint/no-unsafe-return": "warn",
          "@typescript-eslint/no-unsafe-type-assertion": "warn",
          "@typescript-eslint/no-unsafe-unary-minus": "warn",
        },
      },
    ],

    files: ["**/*.{ts,mts,cts,tsx}"],
  },
  {
    extends: [...commonConfigs],

    files: ["*.cjs", "*.mjs"],
  },
);
