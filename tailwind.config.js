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
          50:  '#f9f9f9',
          100: '#f0f0f0',
          500: '#404040',
          600: '#1a1a1a',
          700: '#000000',
        },
        accent: '#ffffff',
      },
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}