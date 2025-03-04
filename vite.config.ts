import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', 
      includeAssets: ['favicon.ico', 'manifest.json'], 
      manifest: {
        name: 'Мои Заметки',
        short_name: 'Заметки',
        description: 'Приложение для ведения заметок',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
              "src": "/assets/icons/icon-48x48.png",
              "type": "image/png",
              "sizes": "48x48" 
          },{
              "src": "/assets/icons/icon-72x72.png",
              "type": "image/png",
              "sizes": "72x72"  
          },{
              "src": "/assets/icons/icon-96x96.png",
              "type": "image/png",
              "sizes": "96x96"  
          },{
              "src": "/assets/icons/icon-128x128.png",
              "type": "image/png",
              "sizes": "128x128"  
          },{
              "src": "/assets/icons/icon-192x192.png",
              "type": "image/png",
              "sizes": "192x192",
              "purpose": "any maskable" 
          },{
              "src": "/assets/icons/icon-284x284.png",
              "type": "image/png",
              "sizes": "284x84"  
          },{
              "src": "/assets/icons/icon-512x512.png",
              "type": "image/png",
              "sizes": "512x512"  
          }
      ],
      }
    }),
  ],
});
