import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        manifest: {
          name: "Dance Break",
          short_name: "Dance Break",
          description: "Improve your health by moving to your favorite songs",
          icons: [
            {
              src: "/icons/logo.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
            {
              src: "/icons/dance_break_logo.svg",
              sizes: "72x72 96x96 128x128 256x256 512x512 1024x1024",
            },
          ],
        },

        devOptions: {
          enabled: true,
        },
      }),
    ],
  };
});
