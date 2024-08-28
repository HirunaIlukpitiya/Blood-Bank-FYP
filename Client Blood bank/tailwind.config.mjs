/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
      xl: "1440px",
    },
    extend: {
      colors: {
        'NavyBlue': '#0040C1',
        'LightBlue' : '#EBF1FF',
        'LBlue' : '#2458D2',
        'Ash' : '#4E4E4E',
        'light-pink' : "#F4F7FE",
        'normal-pink' : "#C9D9FC",
        'disable-gray' : "D1D1D1",
        'blueF' : '#0D2B71',
        'bgCream' : '#FFF5EA',
        'bloodred10' : '#46052D',
        'bloodred9' : '#500732',
        'bloodred8' : '#550832',
        'bloodred7' : '#5E0933',
        'bloodred6' : '#610834',
        'bloodred5' : '#670A37',
        'bloodred4' : '#6A0B37',
        'bloodred3' : '#991747',
        'bloodred2' : '#A8174E',
        'bloodred1' : '#B32346',
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      animation: {
        'spinOneRoundClockwise' : 'spin 1s linear 0.25',
      }
    },
    fontSize: {
      "xs" : ["12px"],
      "2xl": ["16px"],
      "3xl": ["18px"],
      "4xl": ["32px"],
      "5xl": ["48px"],
      "6xl": ["58px"],
    },
  },
  plugins: [
    require('tailwindcss-animated'),
    
  ],
};
