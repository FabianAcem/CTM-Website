import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path"

const THEME_ASSETS = 'C:/Users/acemf/Local Sites/ctm-website/app/public/wp-content/themes/ctm-landing/assets'

export default defineConfig({
  plugins: [react(), tailwindcss()],
    build: {
    outDir: THEME_ASSETS,
    emptyOutDir: false,   // löscht NICHT dein Theme-Ordner
    manifest: true,       // wichtig: WordPress liest dieses Manifest
    rollupOptions: {
      input: '/src/main.jsx'
    }
  }
});
