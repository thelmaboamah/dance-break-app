import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      "process.env.REACT_APP_PASSAGE_APP_ID": JSON.stringify(
        env.REACT_APP_PASSAGE_APP_ID,
      ),
    },
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        manifest: {
          icons: [
            {
              src: "/icons/icon512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
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
