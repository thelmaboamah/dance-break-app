/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mobile': '393px',
      'desktop': '1024px',
    },
    colors: {
      primary: '#800080',
      secondary: '#FFEEFE',
      blueBorder: '#00C2FF', // for download button border
      blueText: '#00526C', // for download button text
      purpleText: '#800080', // for secondary button text
    },
    fontFamily: {
      'dmSans': ['DM Sans', 'sans-serif']
    },
    fontSize: {
      'body': ['16px', {
        lineHeight: '1.2em',
        fontWeight: '400'
      }],
      'button': ['16px', {
        lineHeight: '1.2em',
        fontWeight: '700'
      }],
      'link': ['16px', {
        lineHeight: '1.2em',
        fontWeight: '400',
      }],
      'h3': ['24px', { // subtitle #2
        lineHeight: '1.2em',
        fontWeight: '400'
      }],
      'h2': ['32px', { // subtitle #1
        lineHeight: '1.2em',
      }],
      'h1-regular': ['40px', { // title regular
        lineHeight: '1.2em',
        fontWeight: '400'
      }],
      'h1-bold': ['40px', { // title bold
        lineHeight: '1.2em',
        fontWeight: '700'
      }],
      'timer': ['48px', {
        lineHeight: '1.2em',
      }]
    },
    extend: {},
  },
  plugins: [],
}

