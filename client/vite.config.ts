import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias for the `src` folder
    },
    dedupe: ['react', 'react-dom'], // Ensure React is resolved from the root node_modules
  },
  build: {
    outDir: 'dist', // Output directory for the build
    emptyOutDir: true, // Clear the output directory before building
  },
  root: path.resolve(__dirname), // Ensure Vite uses the client folder as the root
  server: {
    port: 5173, // Optional: Set the dev server port
  },
});