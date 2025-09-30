import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        primaryAccent: '#FFFFFF',
        brand: '#2563EB',
        background: {
          DEFAULT: '#FFFFFF',
          secondary: '#F8FAFC'
        },
        secondary: '#E2E8F0',
        border: '#CBD5E1',
        accent: '#E2E8F0',
        muted: '#475569',
        destructive: '#EF4444',
        positive: '#10B981',
        'chat-bubble': {
          user: '#E3F2FD'
        },
        'chat-text': {
          user: '#000000',
          agent: '#000000'
        }
      },
      fontFamily: {
        geist: 'var(--font-geist-sans)',
        dmmono: 'var(--font-dm-mono)'
      },
      borderRadius: {
        xl: '10px'
      }
    }
  },
  plugins: [] // Temporarily disable plugins to simplify
};
export default config;
