/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          50:  '#fdf2f2',
          100: '#fce4e4',
          200: '#f9c8c8',
          300: '#f3a0a0',
          400: '#ea6b6b',
          500: '#dc3d3d',
          600: '#c92020',
          700: '#8B1A1A',
          800: '#6B1111',
          900: '#5a0e0e',
          950: '#330808',
        },
        stone: {
          50:  '#fafaf9',
          100: '#f5f5f0',
          200: '#e8e8e3',
          300: '#d4d4cf',
          400: '#a8a8a3',
          500: '#79797a',
          600: '#5f5f60',
          700: '#4d4d4e',
          800: '#3d3d3e',
          900: '#1a1a1b',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        heading: ['"Cinzel"', 'Georgia', 'serif'],
        subheading: ['"Outfit"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.0', letterSpacing: '-0.02em' }],
        'display': ['clamp(2rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'title': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2' }],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}
