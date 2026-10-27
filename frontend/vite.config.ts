import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    // Em dev o front fala com /api na mesma origem, igual à produção (Caddy faz o mesmo papel lá).
    proxy: { "/api": "http://localhost:4007" },
  },
});
