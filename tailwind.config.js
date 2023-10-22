/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      desktop: "1024px",
    },
    colors: {
      primary: "#800080",
      secondary: "#FFEEFE",
      blueBorder: "#00C2FF", // for download button border
      blueText: "#00526C", // for download button text
      purpleText: "#800080", // for secondary button text
      yellowBg: "#FFFCED", // for break timer and splash screen
      lightGray: "#818181", // for audio player text
      grey: "#E8E8E8", // for horizontal line in menu
      white: "#FFFFFF",
    },
    fontFamily: {
      dmSans: ["DM Sans", "sans-serif"],
    },
    fontSize: {
      body: [
        "16px",
        {
          lineHeight: "1.2em",
          fontWeight: "400",
        },
      ],
      small: ["16px", { lineHeight: "1.2em", fontWeight: "400" }],
      button: [
        "16px",
        {
          lineHeight: "1.2em",
          fontWeight: "700",
        },
      ],
      link: [
        "16px",
        {
          lineHeight: "1.2em",
          fontWeight: "400",
        },
      ],
      h3: [
        "24px",
        {
          // subtitle #2
          lineHeight: "1.2em",
          fontWeight: "400",
        },
      ],
      h2: [
        "32px",
        {
          // subtitle #1
          lineHeight: "1.2em",
        },
      ],
      "h1-regular": [
        "40px",
        {
          // title regular
          lineHeight: "1.2em",
          fontWeight: "400",
        },
      ],
      "h1-bold": [
        "40px",
        {
          // title bold
          lineHeight: "1.2em",
          fontWeight: "700",
        },
      ],
      timer: [
        "48px",
        {
          lineHeight: "1.2em",
          fontWeight: "400",
        },
      ],
    },
    extend: {
      spacing: {
        8: "8px",
        12: "12px",
        24: "24px",
        32: "32px",
        64: "64px",
        "logo-lg": "124px", //large logo size
        "logo-sm": "40px", //small logo size for nav
        "button-w": "238px", // width of button
        "button-h": "43px", // height of button
      },
      zIndex: {
        1: "1",
      },
    },
  },
  plugins: [],
};
