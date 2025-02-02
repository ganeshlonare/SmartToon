import eslintPluginNode from "eslint-plugin-n";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  {
    plugins: {
      n: eslintPluginNode,
      "simple-import-sort": eslintPluginSimpleImportSort,
      prettier: eslintPluginPrettier,
    },
    rules: {
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "prettier/prettier": "error",
    },
  },
];
