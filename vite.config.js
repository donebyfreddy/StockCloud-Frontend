import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      input: './index.html',
    },
  },
  base: '/', // Ensure this matches your deployment structure
});
