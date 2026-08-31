import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // El prerender WEB-M3 usa este manifiesto para convertir las URLs de
    // assets del render fuente a los nombres fingerprinted de producción.
    manifest: true,
  },
});
