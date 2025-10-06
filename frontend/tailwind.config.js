/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // DartClub Manager Farbschema aus der Doku
        primary: {
          DEFAULT: '#1976D2',  // Material Blue 700
          light: '#63A4FF',
          dark: '#004BA0',
        },
        secondary: {
          DEFAULT: '#FF6F00',  // Orange 800
          light: '#FFA040',
          dark: '#C43E00',
        },
        neutral: {
          background: '#FAFAFA',
          surface: '#FFFFFF',
          'dark-background': '#121212',
          'dark-surface': '#1E1E1E',
        },
        status: {
          error: '#D32F2F',
          success: '#388E3C',
          warning: '#F57C00',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
      },
    },
  },
  plugins: [],
}

// Erstellt von Hans Hahn - Alle Rechte vorbehalten
