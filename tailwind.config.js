/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#fdf4e7',
          100: '#fae3c0',
          200: '#f5c97a',
          300: '#f0ad34',
          400: '#e8960f',
          500: '#c97d0a',
          600: '#a06208',
          700: '#784906',
          800: '#503104',
          900: '#281802',
        },
        dark: {
          900: '#0d0d0d',
          800: '#141414',
          700: '#1c1c1c',
          600: '#242424',
          500: '#2e2e2e',
          400: '#3a3a3a',
        }
      },
      fontFamily: {
        display: ['ClashDisplay', 'sans-serif'],
        ui: ['CabinetGrotesk', 'sans-serif'],
        body: ['GeneralSans', 'sans-serif'],
        serif: ['Sentient', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
}
