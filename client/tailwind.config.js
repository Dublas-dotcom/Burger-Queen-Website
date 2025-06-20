/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /*
        App-wide Palette (from Menu)
        - primary: #0A192F (deep blue)
        - secondary: #FBBF24 (gold)
        - accent: #38BDF8 (sky blue)
        - highlight: #F87171 (red)
      */
      colors: {
        primary: {
          DEFAULT: '#0A192F', // Deep blue
        },
        secondary: {
          DEFAULT: '#FBBF24', // Gold
        },
        accent: {
          DEFAULT: '#38BDF8', // Sky blue
        },
        highlight: {
          DEFAULT: '#F87171', // Red
        },
      },
      fontFamily: {
        'display': ['Georgia', 'serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}