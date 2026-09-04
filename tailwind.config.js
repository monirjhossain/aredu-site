/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A1628',
        crimson: '#E11D2E',
        jade: '#0F766E',
        sand: '#F4F1EC',
        mist: '#E8EEF4',
        soft: '#F7F5F2',
      },
      fontFamily: {
        display: ["'Nunito Sans'", 'system-ui', 'Segoe UI', 'sans-serif'],
        sans: ["'Nunito Sans'", 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: {
        'screen-2xl': '1120px',
      },
      boxShadow: {
        lift: '0 24px 60px -28px rgba(10, 22, 40, 0.35)',
        soft: '0 12px 40px -20px rgba(10, 22, 40, 0.18)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'grain-shift': {
          '0%': { transform: 'translate(0,0)' },
          '100%': { transform: 'translate(-2%, 2%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
