import { transform } from "next/dist/build/swc";
import type { Config } from "tailwindcss";

const svgToDataUri = require("mini-svg-data-uri");

// const colors = require("tailwindcss/colors");

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",   // Ensure values are strings
      md: "768px",   // Ensure values are strings
      lg: "1200px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
      },
    },
    extend: {
      fontFamily: {
        sans: 'var(--font-sans)',
        serif: 'var(--font-serif)',
      },
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
        'ping-large': 'ping-large 1s ease-in-out infinite',
        'move-left': 'move-left 1s linear infinite'
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: '0',
            transform: "translate(-72%, -62%) scale(0.5)",  // Add comma
          },
          "100%": {
            opacity: '1',
            transform: "translate(-50%,-40%) scale(1)",  
          },
        },
        'ping-large': {
          '75%, 100%': {
            transform: 'scale(3)',
            opacity: '0'
          }
        },
        'move-left': {
          '0%':{
            transform: 'translateX(0%)'
          },
          '100%': {
            transform: 'translateX(-50%)'
          }
        }
      },
    },
  },
  plugins: [],
};

export default config;


// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}