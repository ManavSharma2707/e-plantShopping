import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Required so assets resolve correctly on GitHub Pages (https://<user>.github.io/e-plantShopping/)
  base: '/e-plantShopping/',
});
