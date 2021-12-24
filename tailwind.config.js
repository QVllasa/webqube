const colors = require('tailwindcss/colors')

module.exports = {
  prefix: '',
  important: true,
  mode: process.env.NODE_ENV ? 'jit' : undefined,
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
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio')],
};
