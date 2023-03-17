const path = require("node:path");

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  plugins: [
    "react",
    "eslint-plugin-react-hooks",
    "@typescript-eslint",
    "prettier",
  ],
  extends: [
    // "react-app",
    // "react-app/jest",
    "airbnb",
    "airbnb-typescript",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  settings: {
    react: {
      version: "18", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: path.resolve(__dirname, "./tsconfig.json"),
  },
  rules: {
    "react/prop-types": "off", // does it works with typescript correctly?
    "react/no-unused-prop-types": ["off"], // ts
    "react/require-default-props": "off", //typescript
    "react/react-in-jsx-scope": ["off"],
    "react/jsx-uses-react": ["off"],
    "react/jsx-props-no-spreading": ["off"],
    "react/no-unescaped-entities": ["off"],
    "react/function-component-definition": ["off"],
    "@typescript-eslint/no-unused-vars": ["warn"],
    // "no-nested-ternary": ["warn"], // easier to develop "makets" of components logic
    "no-unused-vars": ["warn"], // really hard to develop
    // "import/no-extraneous-dependencies": ["off"], // webwitals ??
    "import/prefer-default-export": ["off"],
    "import/extensions": ["off"],
  },
  overrides: [
    {
      files: ["src/**/*.slice.ts"],
      rules: { "no-param-reassign": ["error", { props: false }] },
    },
  ],
};
