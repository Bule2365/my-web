/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // Tema dikendalikan oleh atribut `data-theme` pada <html>, bukan class.
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--color-bg-rgb) / <alpha-value>)',
        surface: 'rgb(var(--color-surface-rgb) / <alpha-value>)',
        'surface-2': 'rgb(var(--color-surface-2-rgb) / <alpha-value>)',
        border: 'var(--color-border)',
        'border-hover': 'var(--color-border-hover)',
        text: 'var(--color-text)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-tertiary': 'var(--color-text-tertiary)',
        accent: {
          DEFAULT: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
          hover: 'var(--color-accent-hover)',
          solid: 'var(--color-accent-solid)',
          'solid-hover': 'var(--color-accent-solid-hover)',
          subtle: 'var(--color-accent-subtle)',
          border: 'var(--color-accent-border)',
          2: 'rgb(var(--color-accent-2-rgb) / <alpha-value>)',
          3: 'rgb(var(--color-accent-3-rgb) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
