import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Using the Vite React plugin
  optimizeDeps: {
    exclude: ['lucide-react'], // Excluding 'lucide-react' from dependency optimization
  },
});
