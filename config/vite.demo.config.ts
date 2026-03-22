import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname, '../demo'),
  base: '/cloudimage-before-after/',
  build: {
    outDir: resolve(__dirname, '../docs'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@cloudimage/before-after': resolve(__dirname, '../src/index.ts'),
    },
  },
});
