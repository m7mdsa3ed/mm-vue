import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue'
import path from 'path';
import {VitePWA} from 'vite-plugin-pwa'
import pwaOptions from './vite-pwa.config';
import fs from 'fs';

export default defineConfig(({ mode  }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const httpsConfigs = env.HTTPS_ENABLED ? {
    key: fs.readFileSync(env.HTTPS_KEY_PATH),
    cert: fs.readFileSync(env.HTTPS_CERT_PATH),
  } : false

  return {
    plugins: [
      vue(),
      VitePWA(pwaOptions),
    ],
      server: {
    port: 8080,
      https: httpsConfigs,
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
  }
});
