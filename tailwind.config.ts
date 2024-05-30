import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { join } from 'path';
import { Config } from 'tailwindcss'; // Replace 'import type' with 'import'

// 1. [Skeleton addon] Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';

const config = {
  // 2. [Skeleton addon] Opt for dark mode to be handled via the class method
  darkMode: 'selector', // or 'media' for user's system preference, 'class' for class-based dark mode, or 'selector' for allowing users to toggle between light and dark mode with an interactive Lightswitch component.
  content: [
    './src/**/*.{html,postcss,js,svelte,ts}',
    // 3. [Skeleton addon] Append the path to the Skeleton package
    join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
  ],
  theme: {
    extend: {
      width: {
        fill: '-webkit-fill-available',
      },
      /* This extends the default Tailwind CSS color palette, but if we define these colors, the default Tailwind CSS color palette doesn't work 
         So, change the 'colors' property name to 'colors-preset' to comment out and use the default Tailwind CSS color palette
      */
      'colors-preset': {
        base: 'white',
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        yellow: '#FFCA32',
        blue: '#007AFF',
        skyblue: '#0088cc',
        brightyellow: '#D9AD2F',
        red: '#e13838',
        inherit: '#fff',
        btn: '#7EE684',
        green: '#7EE684',
        orrange: '#FFA500',
        cyan: '#67E8F9',
        dimlight: '#D1CEDC',
        grayscale: {
          96: '#f5f5f5',
          100: '#f7fafc',
          200: '#5C5C5C',
          300: '#4E4E4E',
          400: '#424242',
          500: '#353535',
          600: '#292929',
          700: '#1E1E1E',
          800: '#121212',
          900: '#000000',
        },
        blackrussian: {
          50: '#B3B1BE',
          100: '#6B6975',
          200: '#5E5C68',
          300: '#514F5A',
          400: '#44424D',
          500: '#373540',
          600: '#2B2A34',
          700: '#201E28',
          800: '#15131D',
          900: '#050212',
        },
        ferngreen: {
          bright: '#009B3A',
          100: '#007B22',
          200: '#006D13',
          300: '#005E02',
          400: '#005100',
          500: '#004300',
          600: '#003600',
          700: '#002B00',
          800: '#002300',
          900: '#001B00',
        },
        coralred: {
          100: '#D3071C',
          200: '#C10010',
          300: '#AF0003',
          400: '#9E0000',
          500: '#8C0000',
          600: '#7C0000',
          700: '#6C0000',
          800: '#5D0000',
          900: '#510000',
        },
        sandybrown: {
          96: '#EEA364',
          100: '#995A1E',
          200: '#894C0F',
          300: '#793F00',
          400: '#6A3300',
          500: '#5B2600',
          600: '#4E1A00',
          700: '#420C00',
          800: '#380000',
          900: '#320000',
        },
        neutral: {
          100: '#995A1E',
          200: '#894C0F',
          300: '#793F00',
          400: '#6A3300',
          500: '#5B2600',
          600: '#4E1A00',
          700: '#420C00',
          800: '#380000',
          900: '#320000',
        },
        'primary-sandy-brown': '#E19B61',
        'primary-hightlight-text': '#e4b235',
        'primary-kashmir-blue': '#526685',
        'primary-black-russian': '#15131D',
        'primary-fern-green': '#65CD6D',
      },
    },
    fontFamily: {
      sans: ['Roboto', 'SF Pro', 'Open Sans', 'sans-serif'],
      'open-sans': ['Open Sans', 'sans-serif'],
      montserrat: ['Montserrat', 'sans-serif'],
      serif: ['Monserrant', 'serif'],
      mono: ['Courtial New', 'monospace'] /* for the fixed width in code display */,
      monospace: ['Courtial New', 'monospace'] /* for the fixed width in code display */,
    },
  },
  plugins: [
    forms,
    typography,
    // 4. [Skeleton addon]  Append the Skeleton plugin (after other plugins)
    skeleton({
      themes: {
        preset: [
          {
            name: 'skeleton',
            enhancements: true,
          },
          {
            name: 'wintry',
            enhancements: true,
          },
          {
            name: 'modern',
            enhancements: true,
          },
          {
            name: 'hamlindigo',
            enhancements: true,
          },
          {
            name: 'rocket',
            enhancements: true,
          },
          {
            name: 'sahara',
            enhancements: true,
          },
          {
            name: 'gold-nouveau',
            enhancements: true,
          },
          {
            name: 'vintage',
            enhancements: true,
          },
          {
            name: 'seafoam',
            enhancements: true,
          },
          {
            name: 'crimson',
            enhancements: true,
          },
        ],
      },
    }),
  ],
  corePlugins: {
    divideStyle: true,
    textColor: true,
  },
} satisfies Config;

export default config;
