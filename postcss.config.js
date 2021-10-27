const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'),

    autoprefixer,

    postcssPresetEnv({
      browsers: 'last 2 versions',
      stage: 1,
      features: {
        'focus-within-pseudo-class': false,
      },
    }),

    cssnano({
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    }),
  ],
};
