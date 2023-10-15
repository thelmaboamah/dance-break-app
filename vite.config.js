import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      'process.env.REACT_APP_PASSAGE_APP_ID': JSON.stringify(env.REACT_APP_PASSAGE_APP_ID),
      'process.env.PASSAGE_API_KEY': JSON.stringify(env.PASSAGE_API_KEY),
      'process.env.REACT_PUBLIC_SUPABASE_URL': JSON.stringify(env.REACT_PUBLIC_SUPABASE_URL),
      'process.env.REACT_PUBLIC_SUPABASE_ANON_KEY': JSON.stringify(env.REACT_PUBLIC_SUPABASE_ANON_KEY),
      'process.env.SUPABASE_JWT_SECRET': JSON.stringify(env.SUPABASE_JWT_SECRET),
    },
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          icons: [
            {
              src: '/icons/icon512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ],
        },
        
        devOptions: {
          enabled: true,
        },
      }),
    ],
}});
