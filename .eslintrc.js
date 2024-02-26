module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: [
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "plugin:vue/vue3-recommended",
    //"plugin:vue/recommended",
    "@vue/prettier",
    "@vue/typescript/recommended",
  ],
  plugins: ["vue", "prettier", "@typescript-eslint"],
  rules: {
    "no-unused-vars": "off", // Show error for unused variables
    "@typescript-eslint/no-unused-vars": "error",
  },
  "ignorePatterns": ["dist"],
  "prettier/prettier": [
    "warn",
  ]
};
