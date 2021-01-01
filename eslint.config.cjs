// @ts-check

const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const reactPlugin = require("eslint-plugin-react");
const promisePlugin = require("eslint-plugin-promise");
const jsxA11yPlugin = require("eslint-plugin-jsx-a11y");
const prettierPlugin = require("eslint-config-prettier");

/**
 * stripRulesTypes
 * because not all plugins have good types
 * @param {Omit<import("typescript-eslint").ConfigWithExtends,"rules"> & {rules:Record<string,any>}} input
 */
const stripRulesTypes = (input) => ({ ...input });

const commonConfigs = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  stripRulesTypes({
    ...promisePlugin.configs.recommended,
    plugins: { promise: promisePlugin },
  }),
  stripRulesTypes(prettierPlugin),
);

module.exports = tseslint.config(
  {
    extends: [
      ...tseslint.configs.recommendedTypeCheckedOnly,
      {
        languageOptions: {
          parserOptions: {
            project: true,
            tsconfigDirName: __dirname,
          },
        },
      },
      ...commonConfigs,
      {
        plugins: { react: reactPlugin },
        rules: reactPlugin.configs.recommended.rules,
        settings: { react: { version: "detect" } },
      },
      stripRulesTypes({
        plugins: { "react-hooks": reactHooksPlugin },
        rules: reactHooksPlugin.configs.recommended.rules,
      }),
      stripRulesTypes({
        plugins: { "jsx-a11y": jsxA11yPlugin },
        languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
        rules: jsxA11yPlugin.configs.recommended.rules,
      }),
      {
        rules: {
          "react/display-name": "off",
          "react/prop-types": "off",
        },
      },
    ],

    files: ["**/*.{ts,mts,cts,tsx}"],
  },
  {
    extends: [
      ...commonConfigs,
      {
        ignores: ["*.mjs"],
        rules: {
          "no-undef": "off",
          "@typescript-eslint/no-var-requires": "off",
        },
      },
    ],

    files: ["*.cjs", "*.mjs"],
  },
);
