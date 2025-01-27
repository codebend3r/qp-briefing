import { includeIgnoreFile } from "@eslint/compat"
import pluginJs from "@eslint/js"
import pluginImport from "eslint-plugin-import"
import pluginReact from "eslint-plugin-react"
import globals from "globals"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, ".gitignore")

export default [
  includeIgnoreFile(gitignorePath),
  {
    files: ["src/*.{js,jsx}"],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      import: pluginImport,
    },
    rules: {
      curly: "off",
      "brace-style": "off",
      "no-case-declarations": "error",
      "no-fallthrough": "off",
      "no-unreachable": "off",
      "no-empty": "off",
      "no-undef": "off",
      "no-extra-boolean-cast": "off",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-unused-vars": "off",
      "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
      "react/jsx-key": "off",
      "react/no-unknown-property": ["error", { ignore: ["jsx", "global"] }],
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        pragma: "React",
        version: "detect",
      },
    },
  },
]
