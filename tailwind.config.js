const colors = require('tailwindcss/colors')

module.exports = {
  prefix: '',
  important: true,
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
        cyan: colors.cyan,
      },
    },
  },
  variants: {
    textColor: [
      // …
      'selection',
    ],
    backgroundColor: [
      // …
      'selection',
    ],
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require("daisyui"),
    require("tailwindcss-selection-variant")],
};
