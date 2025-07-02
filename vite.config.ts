/// <reference types="vite/client" />
/// <reference types="vitest" />
import path, { resolve } from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      exclude: ["src/test", "**/*.test.tsx"],
      tsconfigPath: "tsconfig.app.json",
      outDir: "dist",
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: {
        // Main bundle with all components
        index: resolve(__dirname, "src/main.ts"),
        // Category-specific bundles
        collections: resolve(__dirname, "src/components/collections/index.ts"),
        conditional: resolve(__dirname, "src/components/conditional/index.ts"),
        // Individual component exports
        "collections/for": resolve(
          __dirname,
          "src/components/collections/for/index.ts"
        ),
        "conditional/ifelse": resolve(
          __dirname,
          "src/components/conditional/ifelse/index.ts"
        ),
        "conditional/switch": resolve(
          __dirname,
          "src/components/conditional/switch/index.ts"
        ),
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        format: "es",
        entryFileNames: "[name].js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: "assets/[name][extname]",
        preserveModules: false,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    coverage: {
      include: ["src/components"],
    },
  },
});
