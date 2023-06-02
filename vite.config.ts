import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
  server: {
    fs: {
      allow: [
        'src/**/*.{test,spec}.{js,ts}',
        '/Users/Shared/nodejs/myapp/node_modules', // for allowing access to ln -s node_modules in other volume
      ],
    },
  },
});
