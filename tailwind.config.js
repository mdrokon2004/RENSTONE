/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#111111',
          pure: '#0B0B0B',
          surface: '#1A1A1A',
          border: '#282828'
        },
        champagne: {
          DEFAULT: '#C5A46D',
          light: '#D8BC8A',
          dark: '#A6844E',
          muted: '#C5A46D26'
        },
        ivory: {
          DEFAULT: '#F5F2EC',
          soft: '#FAF8F5',
          cream: '#EFEBE1'
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.07)',
        'luxury-hover': '0 25px 50px -12px rgba(197, 164, 109, 0.15)',
        'drawer': '-10px 0 30px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
