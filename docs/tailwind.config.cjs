/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary:
          'hsl(var(--nextra-primary-hue)var(--nextra-primary-saturation)45%/var(--tw-text-opacity))'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
