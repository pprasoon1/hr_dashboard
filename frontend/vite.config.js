import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // Ensure React support is added
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // '@' maps to './src'
    },
  },
});
