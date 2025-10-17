import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff8eb',
          100: '#fdeccd',
          200: '#f9d79b',
          300: '#f4bb5d',
          400: '#eaa330',
          500: '#c9831a', // warm brown/gold
          600: '#a66717',
          700: '#875314',
          800: '#6b4111',
          900: '#58360f'
        }
      }
    },
    container: {
      center: true,
      padding: '1rem'
    }
  },
  plugins: [],
} satisfies Config
