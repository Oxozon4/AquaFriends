import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const LOCALBACKEND = 'http://localhost:8080';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    proxy: {
      '/api': {
        target: LOCALBACKEND,
        changeOrigin: false,
        secure: false,
      },
      '/api/perform_login': {
        target: LOCALBACKEND,
        changeOrigin: false,
        secure: false,
      },
    },
  },
});
