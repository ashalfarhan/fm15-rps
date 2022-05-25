import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@app': resolve(__dirname, 'src'),
    },
  },
  plugins: [svelte()],
  server: {
    port: 3004,
  },
});
