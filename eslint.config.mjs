// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactPlugin from "eslint-plugin-react";
import promisePlugin from "eslint-plugin-promise";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import prettierPlugin from "eslint-config-prettier";

const dirname = new URL(".", import.meta.url).pathname;

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
        plugins: { react: reactPlugin },
        rules: reactPlugin.configs.recommended.rules,
        settings: { react: { version: "detect" } },
      },
      {
        plugins: { "react-hooks": reactHooksPlugin },
        rules: reactHooksPlugin.configs.recommended.rules,
      },
      {
        plugins: { "jsx-a11y": jsxA11yPlugin },
        languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
        rules: jsxA11yPlugin.configs.recommended.rules,
      },
      {
        rules: {
          "react/display-name": "off",
          "react/prop-types": "off",
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
