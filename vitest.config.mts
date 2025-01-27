/// <reference types="vitest" />
import { resolve } from "path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/components"),
      "@config": resolve(__dirname, "./src/config"),
      "@data": resolve(__dirname, "./src/data"),
      "@fetcher": resolve(__dirname, "./src/fetcher"),
      "@hooks": resolve(__dirname, "./src/hooks"),
      "@lib": resolve(__dirname, "./src/lib"),
      "@pages": resolve(__dirname, "./src/pages"),
      "@prismicConfig": resolve(__dirname, "./src/prismicConfig"),
      "@styles": resolve(__dirname, "./src/styles"),
      "@utils": resolve(__dirname, "./src/utils"),
    },
  },
  test: {
    environment: "jsdom", // Simulate browser environment
    setupFiles: "./vitest.setup.ts", // Optional, for setup
    globals: true, // Make vitest use global test functions like `describe`, `it`, etc.
  },
})
