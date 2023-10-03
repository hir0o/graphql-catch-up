import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

const srcDirRoot = "client/vite";

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, srcDirRoot),
  publicDir: path.resolve(__dirname, srcDirRoot, "public"),
  build: {
    outDir: path.resolve(__dirname, "dist/client"),
    emptyOutDir: true,
  },
  plugins: [react()],
});
