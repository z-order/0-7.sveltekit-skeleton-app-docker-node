/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
module.exports = {
  // 1. Apply the dark mode class setting:
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}',
    // 2. Append the path for the Skeleton NPM package and files:
    require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        },
        '.btn-blue': {
          backgroundColor: '#3490dc',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#2779bd'
          },
        },
        '.btn-red': {
          backgroundColor: '#e3342f',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#cc1f1a'
          },
        },
        '.variant-filled': {
          backgroundColor: 'rgb(var(--color-surface-900))',
          color: 'rgb(var(--color-surface-50))',
          '&:hover': {
            backgroundColor: 'rgb(var(--color-surface-800))',
          },
        },
        '.dark .variant-filled': {
          backgroundColor: 'rgb(var(--color-surface-50))',
          color: 'rgb(var(--color-surface-900))',
          '&:hover': {
            backgroundColor: 'rgb(var(--color-surface-100))',
          },
        },
      })
    }),
    // 3. Append the Skeleton plugin to the end of this list
    require('@tailwindcss/forms'),
    ...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')(),
  ],
};
