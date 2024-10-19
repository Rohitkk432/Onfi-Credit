import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jwsx,tsx,mdx}",
    "./src/page-modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: '640px',
      sm: '768px',
      md: '900px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1650px',
      '4xl': '1780px',
      '5xl': '2160px', // only need to control product grid mode in ultra 4k device
    },
    extend: {
      colors: {
        primary: {
          50: "#E3FCF8",
          100: "#C3F9F0",
          200: "#86F3E1",
          300: "#4AEDD2",
          400: "#16E4C2",
          500: "#10A68C",
          600: "#0D8773",
          700: "#096253",
          800: "#064137",
          900: "#03211C",
          950: "#021310",
          transparent: '#10a68c4d',
        },
        error:{
          50: "#ffebeb",
          100: "#ffc1c2",
          200: "#ffa3a5",
          300: "#ff7a7c",
          400: "#ff6062",
          500: "#ff383b",
          600:"#e83336",
          700: "#b5282a",
          800:"#8c1f20",
          900:"#6b1819",
          transparent: "#ff383b4d",
        },
        success:{
          50: "#e6fded",
          100: "#b1f8c7",
          200: "#8bf4ac",
          300: "#55ef86",
          400: "#35ec6f",
          500: "#02e74b",
          600: "#02d244",
          700: "#01a435",
          800: "#017f29",
          900: "#016120",
          transparent: "#02e74b4d",
        },
        warning:{
          50: "#fff3e9",
          100: "#ffd9ba",
          200: "#ffc698",
          300: "#ffad69",
          400: "#ff9d4c",
          500: "#ff841f",
          600:"#e8781c",
          700: "#b55e16",
          800:"#8c4911",
          900:"#6b370d",
          transparent: "#ff841f4d",
        },
        neutral: {
          50: "#EBEBEB",
          100: "#D4D4D4",
          200: "#A8A8A8",
          300: "#7D7D7D",
          400: "#525252",
          500: "#272727",
          600: "#1F1F1F",
          700: "#171717",
          800: "#0F0F0F",
          900: "#080808",
          950: "#050505"
        }
      },
      fontSize: {
        '5xs': ['5px', '9px'],
        '4xs': ['7px', '11px'],
        '3xs': ['9px', '13px'],
        '2xs': ['11px', '15px'],
        '13px': ['13px', '18px'],
      },
      boxShadow: {
        main: '0px 6px 18px rgba(0, 0, 0, 0.04)',
        light: '0px 4px 4px rgba(0, 0, 0, 0.08)',
        large: '0px 8px 16px rgba(17, 24, 39, 0.1)',
        card: '0px 2px 6px rgba(0, 0, 0, 0.06)',
        transaction: '0px 8px 16px rgba(17, 24, 39, 0.06)',
        expand: '0px 0px 50px rgba(17, 24, 39, 0.2)',
        button:
          '0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)',
      },
      dropShadow: {
        main: '0px 4px 8px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        blink: 'blink 1.4s infinite both;',
        'move-up': 'moveUp 500ms infinite alternate',
        'scale-up': 'scaleUp 500ms infinite alternate',
        'drip-expand': 'expand 500ms ease-in forwards',
        'drip-expand-large': 'expand-large 600ms ease-in forwards',
        'move-up-small': 'moveUpSmall 500ms infinite alternate',
      },
      keyframes: {
        blink: {
          '0%': { opacity: "0.2" },
          '20%': { opacity: "1" },
          '100%': { opacity: "0.2" },
        },
        expand: {
          '0%': {
            opacity: "0",
            transform: 'scale(1)',
          },
          '30%': {
            opacity: "1",
          },
          '80%': {
            opacity: "0.5",
          },
          '100%': {
            transform: 'scale(30)',
            opacity: "0",
          },
        },
        'expand-large': {
          '0%': {
            opacity: "0",
            transform: 'scale(1)',
          },
          '30%': {
            opacity: "1",
          },
          '80%': {
            opacity: "0.5",
          },
          '100%': {
            transform: 'scale(96)',
            opacity: "0",
          },
        },
        moveUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-20px)' },
        },
        moveUpSmall: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-10px)' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
