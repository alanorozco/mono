module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: false,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["local"],
  rules: {
    "no-unused-vars": "error",
  },
  overrides: [
    {
      files: ["src/sites.mjs"],
      rules: {
        "local/sites": "error",
      },
    },
  ],
};
