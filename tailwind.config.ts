module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        foreground: '#f3f3f3',
        'background-start': '#050a13',
        'background-end': '#0a1626',
        primary: '#102133',
        secondary: '#0b1a27',
        accent: '#17414d',
        error: '#ff5a5a',
        loading: '#ffd700',
        disabled: '#585c51',
        border: '#1e293b',
        link: '#299693',
      },
      blur: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        h1: ['24px', '32px'],
        h2: ['20px', '28px'],
        h3: ['18px', '24px'],
        body: ['16px', '24px'],
        small: ['14px', '20px'],
      },
    },
  },
  variants: {},
  plugins: [],
};
