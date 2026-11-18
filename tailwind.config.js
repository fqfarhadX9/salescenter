/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070F1F',
          900: '#0B1B33',
          800: '#12274A',
          700: '#1B3561',
          600: '#284A80',
        },
        gold: {
          50: '#FBF6EA',
          100: '#F3E7C8',
          200: '#E8D3A0',
          300: '#DCBE7A',
          400: '#C9A55C',
          500: '#B08D46',
          600: '#94733A',
          700: '#735930',
        },
        cream: {
          50: '#FDFBF7',
          100: '#F8F3EA',
          200: '#F1E8D9',
        },
        ink: '#1A2133',
      },
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'Times New Roman', 'serif'],
      },
      borderRadius: {
        card: '14px',
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(11, 27, 51, 0.18)',
        lift: '0 24px 60px -20px rgba(11, 27, 51, 0.35)',
        gold: '0 12px 28px -10px rgba(176, 141, 70, 0.55)',
      },
      maxWidth: {
        site: '1240px',
      },
      keyframes: {
        'fade-in': { from: { opacity: 0 }, to: { opacity: 1 } },
        'zoom-in': {
          from: { opacity: 0, transform: 'scale(0.96)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
        'slow-zoom': {
          from: { transform: 'scale(1.08)' },
          to: { transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.25s ease-out',
        'zoom-in': 'zoom-in 0.3s ease-out',
        'slow-zoom': 'slow-zoom 2.4s cubic-bezier(0.2, 0.7, 0.2, 1) both',
      },
    },
  },
  plugins: [],
}
