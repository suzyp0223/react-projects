import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/ㅇ
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // <- 여기 디렉터리 이름을 꼭 확인하세요
  },
});
