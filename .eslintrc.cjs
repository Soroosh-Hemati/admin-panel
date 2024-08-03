module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [1, { extensions: [".jsx"] }],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
      },
    ],
    "import/no-unresolved": "error",
    "import/no-extraneous-dependencies": "error",
    "import/no-mutable-exports": "error",
    "import/first": "error",
    "import/no-duplicates": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
      },
    ],
  },
};
