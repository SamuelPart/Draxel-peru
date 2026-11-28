/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#C9A227',
          'orange-hover': '#B8901F',
          obsidian: '#090A0F',
          graphite: '#14161F',
          pearl: '#F8FAFC',
          whatsapp: '#16A34A',
          'whatsapp-hover': '#15803D',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        card: '0 20px 50px -20px rgba(9, 10, 15, 0.25)',
        'card-hover': '0 32px 70px -24px rgba(9, 10, 15, 0.38)',
        'glow-orange': '0 18px 45px -12px rgba(201, 162, 39, 0.5)',
        'glow-gold': '0 18px 45px -12px rgba(212, 175, 55, 0.45)',
        'glow-green': '0 18px 45px -12px rgba(22, 163, 74, 0.5)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '80%, 100%': { transform: 'scale(1.9)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2.2s linear infinite',
      },
    },
  },
  plugins: [],
};
