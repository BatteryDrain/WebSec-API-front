import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import process from "process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const backendUrl = env.VITE_API_BASE_URL;

  if (!backendUrl) {
    throw new Error("VITE_API_BASE_URL is not defined");
  }

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@components": path.resolve(__dirname, "src/components"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@pages": path.resolve(__dirname, "src/pages"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: backendUrl,
          changeOrigin: true,
          secure: false,
        },
        "/uploads": {
          target: backendUrl,
          changeOrigin: true,
          secure: false,
        },
      },
    },

    build: {
      outDir: "dist",
      sourcemap: false,
      minify: "esbuild",
      target: "esnext",
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
      chunkSizeWarningLimit: 1000,
    },
  });
}
