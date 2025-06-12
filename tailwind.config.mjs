/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.{css,scss}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
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
    },
  },
  plugins: [],
}; 