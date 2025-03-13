//@ts-ignore
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'App',
        short_name: 'App',
        description: 'Test App (React)',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ],
        id: '/?source=pwa',
        launch_handler: {
          client_mode: 'auto'
        },
        orientation: 'portrait',
        screenshots: [
          {
            src: '/screenshot1.png',
            sizes: '2545x1218',
            type: 'image/png'
          }
        ],
        categories: ['productivity'],
        dir: 'ltr',
        iarc_rating_id: 'e84d39d1-0f3b-4a22-8d48-3c69d39d9082',
        prefer_related_applications: false,
        related_applications: [
          {
            platform: 'play',
            id: 'com.app.app'
          }
        ],
        scope_extensions: [
          {
            origin: '*.app.com'
          }
        ],
        lang: 'ru-RU',
        scope: '/'
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,svg}'],
      },
    }),
  ],
});