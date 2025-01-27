/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  arrowParens: "always",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "^@api/(.*)$",
    "^@axios/(.*)$",
    "^@components/(.*)$",
    "^@constants/(.*)$",
    "^@hooks/(.*)$",
    "^@lib/(.*)$",
    "^@pages/(.*)$",
    "^@styles/(.*)$",
    ".*.css$",
    ".*.scss$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  printWidth: 120,
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
}

export default config
