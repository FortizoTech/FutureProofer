
import { fileURLToPath } from "url";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(async ({ command, mode }) => {
  const { default: express } = await import("express");
  const { default: session } = await import("express-session");
  const { default: memorystore } = await import("memorystore");
  const MemoryStore = memorystore(session);

  return {
    root: path.resolve(__dirname, "client"),
    publicDir: path.resolve(__dirname, "client", "public"),
    build: {
      outDir: path.resolve(__dirname, "dist", "client"),
      emptyOutDir: true,
    },
    plugins: [
      react(),
      tsconfigPaths(),
    ],
    server: {
      proxy: {
        "/api": "http://localhost:3001",
      },
    },
  };
});
