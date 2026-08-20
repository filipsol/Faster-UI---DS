import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "node:url";

// Library build config: `npm run build:lib` bundles src/index.ts into
// ESM + CJS outputs with generated type declarations for npm publishing.
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({ include: ["src"], exclude: ["**/*.test.*", "**/*.cy.*", "**/*.stories.*"] }),
  ],
  build: {
    outDir: "dist",
    lib: {
      entry: fileURLToPath(new URL("src/index.ts", import.meta.url)),
      name: "FasterUI",
      formats: ["es", "cjs"],
      fileName: (format) => `faster-ui.${format === "es" ? "mjs" : "cjs"}`,
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        assetFileNames: (asset) =>
          asset.name === "style.css" ? "faster-ui.css" : (asset.name ?? "[name][extname]"),
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
