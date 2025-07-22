// postcss.config.cjs
const config = {
  plugins: {
    'tailwindcss': require('@tailwindcss/postcss'),
    'autoprefixer': {},
  },
};

// Use CommonJS export syntax for PostCSS config files
module.exports = config;