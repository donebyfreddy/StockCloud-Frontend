import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,  // Port for local dev
    open: true,   // Open browser automatically
  },
  build: {
    outDir: 'build', // Output directory for build
    rollupOptions: {
      input: './index.html', // Ensure this points to the correct entry point
    },
  },
});
