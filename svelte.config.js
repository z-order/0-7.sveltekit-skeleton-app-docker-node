import preprocess from 'svelte-preprocess';
/* import adapter from '@sveltejs/adapter-auto'; // default adapter  */
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';
import path from 'path';

const warnIgnores = {
  'css-unused-selector': {
    capture: /.*"(.*)"$/,
    ignore: [
      /^\.p\d+/,
      /^\.sm\d+/,
      /^\.md\d+/,
      /^\.lg\d+/,
      /^\.xg\d+/,
      /^\.all\d+/,
      /^\.row(::after)?/
    ]
  }
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  onwarn: (warning, handler) => {
    const { code, frame, filename } = warning;
    if (code === "css-unused-selector")
      return;
    handler(warning);
  },
  /*
  onwarn: (warning, handler) => {
    const { message, code } = warning;
    const patterns = warnIgnores[code];
    if (patterns != undefined) {
      // Find the meat.
      const meat = message.match(patterns.capture);
      if (meat != null) {
        for (var i = 0; i < patterns.ignore.length; i++) {
          if (meat[1].match(patterns.ignore[i]) != null) {
            return;
          }
        }
      }
    }
  },
  */

  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    preprocess({
      defaults: {
        style: 'scss'
      },
      postcss: true,
      scss: {
        prependData: `@import 'src/scss/global.scss';`
      }
    }),
  ],
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    // adapter: adapter(), // default adapter
    adapter: adapter({
      // default options are shown
      out: 'build',          // The directory to build the server to. It defaults to build
      precompress: false,    // Enables precompressing using gzip and brotli for assets and prerendered pages. It defaults to false
      envPrefix: '',
      polyfill: true
    }),
    alias: {
      $lib: path.resolve('./src/lib'),
      $data: path.resolve('./src/data'),
      $config: path.resolve('./src/config'),
      $assets: path.resolve('./src/assets'),
    }
  },

};

export default config;