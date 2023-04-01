import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa'
import pwaOptions from './vite-pwa.config';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA(pwaOptions),
  ],
  server: {
    port: 8080
  },
  build: {
    sourcemap: true,
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  },
});
