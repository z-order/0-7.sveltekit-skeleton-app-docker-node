const config = {
  plugins: [
    // Some plugins, like postcss-import, need to run before Tailwind,
    require('postcss-import'),
    //Some plugins, like tailwindcss/nesting, need to run before Tailwind,
    require('tailwindcss'),
    //But others, like autoprefixer, need to run after,
    require('autoprefixer'),
  ],
};

module.exports = config;
