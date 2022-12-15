const path = require("path");

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "react-app",
    "react-app/jest",
    "airbnb",
    "airbnb-typescript",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: path.resolve(__dirname, "./tsconfig.json"),
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
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
    "no-nested-ternary": ["warn"], // easier to develop "makets" of components logic
    "no-unused-vars": ["warn"], // really hard to develop
    "no-param-reassign": ["off"], // because of Immer(ReduxToolkit)
    "import/no-extraneous-dependencies": ["off"], // webwitals ??
  },
};
