import preprocess from 'svelte-preprocess';
/* import adapter from '@sveltejs/adapter-auto'; // default adapter  */
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte'],
  compilerOptions: {},
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    vitePreprocess({}),
    preprocess({
      defaults: {
        style: 'postcss', // 'scss' or 'postcss'/'pcss'
      },
      postcss: true,
      scss: {
        // If you want to prepend data to all of your style files, you can do so here.
        // prependData: `@import 'src/scss/global.scss';`
      },
    }),
  ],
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    // adapter: adapter(), // default adapter
    adapter: adapter({
      // default options are shown
      out: 'build', // The directory to build the server to. It defaults to build
      precompress: false, // Enables precompressing using gzip and brotli for assets and prerendered pages. It defaults to false
      envPrefix: '',
      polyfill: true,
    }),
    alias: {
      $ui: path.resolve('./src/ui'), // for layouts, components, icons, etc.
      $lib: path.resolve('./src/lib'), // for utility functions, helpers, etc.
      $data: path.resolve('./src/data'), // for data, like json ojects, json files, etc.
      $config: path.resolve('./src/config'), // for global configuration
      $assets: path.resolve('./src/assets'), // for images, fonts, icons, etc.
      $stores: path.resolve('./src/stores'), // svetle-stores
    },
  },
  onwarn: (warning, handler) => {
    //
    // refers to:
    // https://github.dev/sveltejs/vite-plugin-svelte/
    // https://github.dev/sveltejs/vite-plugin-svelte/blob/main/packages/vite-plugin-svelte/src/index.ts
    //
    // And more details, go check out sveltekit definition source code below:
    // import { sveltekit } from '@sveltejs/kit/vite';
    //
    // don't warn on 'a11y-*' messages
    if (warning.code.slice(0, 4).toLowerCase() === 'a11y') {
      // a11y-* roles are not valid
      // console.log('warning.code', warning.code, warning.message);
      return;
    }
    // don't warn on 'css-unused-selector' messages
    if (warning.code === 'css-unused-selector') {
      // console.log('warning.code', warning.code, warning.message);
      return;
    }
    // let Rollup handle all other warnings normally
    handler(warning);
  },
  // plugin options
  vitePlugin: {
    exclude: [],
    // experimental options
    experimental: {},
  },
};

export default config;
