/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{css,scss}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          outer: 'var(--color-bg-outer)',
          main: 'var(--color-bg-main)',
          sidebar: 'var(--color-bg-sidebar)',
          bubbleOther: 'var(--color-bg-bubble-other)',
          bubbleSelf: 'var(--color-bg-bubble-self)',
          input: 'var(--color-bg-input)',
        },
        text: {
          main: 'var(--color-text-main)',
          secondary: 'var(--color-text-secondary)',
          accent: 'var(--color-text-accent)',
          bubbleOther: 'var(--color-text-bubble-other)',
          bubbleSelf: 'var(--color-text-bubble-self)',
        },
        accent: 'var(--color-accent)',
        status: {
          online: 'var(--color-status-online)',
          offline: 'var(--color-status-offline)',
          unread: 'var(--color-status-unread)',
        },
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
      },
      boxShadow: {
        md: 'var(--shadow-md)',
        sm: 'var(--shadow-sm)',
      },
      spacing: {
        xs: 'var(--space-xs)',
        sm: 'var(--space-sm)',
        md: 'var(--space-md)',
        lg: 'var(--space-lg)',
      },
      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
      },
      opacity: {
        border: 'var(--opacity-border)',
        hover: 'var(--opacity-hover)',
        active: 'var(--opacity-active)',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-bg-main',
    'bg-bg-sidebar',
    'bg-bg-bubble-other',
    'bg-bg-bubble-self',
    'bg-bg-input',
    'bg-bg-outer',
    'text-text-main',
    'text-text-secondary',
    'text-text-accent',
    'text-text-bubble-other',
    'text-text-bubble-self',
    'border-bg-bubble-other',
    'border-bg-bubble-self',
    'border-bg-main',
    'border-bg-sidebar',
    'border-bg-input',
    'border-bg-outer',
  ],
}; 