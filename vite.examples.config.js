/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
  ],
  base: './',
  optimizeDeps: {
    exclude: ['vue-select', '@fortawesome/vue-fontawesome'],
  },
});
