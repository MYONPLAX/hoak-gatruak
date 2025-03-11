// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro", "prettier-plugin-svelte"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
        useTabs: true,
        tabWidth: 1,
        trailingComma: "all",
        singleQuote: true,
        bracketSameLine: true,
      },
    },
    {
      files: "*.ts",
      options: {
        parser: "typescript",
        tabWidth: 2,
        trailingComma: "es5",
        singleQuote: true,
      },
    },
    {
      files: "*.svelte",
      options: {
        parser: "svelte",
        useTabs: true,
        singleQuote: true,
        printWidth: 100,
      },
    },
  ],
};
