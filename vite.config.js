import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://shanture-backend-4s8t.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});