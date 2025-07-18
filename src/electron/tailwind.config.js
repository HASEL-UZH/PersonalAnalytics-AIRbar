/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './PA.SelfReflection/src/**/*.{vue,js,ts,jsx,tsx}'], // ***AIRBAR - added PA.SelfReflection
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  theme: {
    extend: {
      colors: {
        neutral: colors.neutral
      }
    }
  },
  daisyui: {
    themes: ['dark']
  },
  // needed for the dynamic classes
  safelist: [
    {
      pattern:
        /(bg|border|border-l|border-b|outline|text)-!?(amber|fuchsia|teal|rose|red|sky|orange|yellow|violet|pink|green|blue|neutral)-(300|400|500|600|800)/,
      variants: ['active', 'focus']
    }
  ]
}
