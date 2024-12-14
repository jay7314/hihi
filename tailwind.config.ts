import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation :{
        borderSpinGoogle : "borderSpinGoogle 1.5s linear infinite",
        borderSpinNaver : "borderSpinNaver 1.5s linear infinite",
        borderSpinKakao : "borderSpinKakao 1.5s linear infinite"

      },
      keyframes:{
        borderSpinGoogle : {
          "0%" : {borderColor : "#4285F4"},
          "50%" : {borderColor : "#ffffff"},
          "100%": { borderColor: "#4285F4" },
        },
        borderSpinNaver : {
          "0%" : {borderColor : "#03C75A"},
          "50%" : {borderColor : "#ffffff"},
          "100%": { borderColor: "#03C75A" },
        },
        borderSpinKakao : {
          "0%" : {borderColor : "#ffcd00"},
          "50%" : {borderColor : "#ffffff"},
          "100%": { borderColor: "#ffcd00" },
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        naverColor : "#03C75A",
        googleColor : "#4285F4",
        kakaoColor : "#ffcd00",
      },
      backgroundImage : {
        background : 'url("/background.jpg")',
        navbackground : 'url("/nav_background.jpg")'
        
      },
    },
  },
  plugins: [],
} satisfies Config;
