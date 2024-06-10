import { nextui } from "@nextui-org/theme";
/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./node_modules/@nextui-org/theme/dist/components/[object Object].js",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
      white: "#FFFFFF",
      black: "#1c211f",
      gray: {
        DEFAULT: "#7F7F7F",
        50: "#FFFFFF",
        100: "#FFFFFF",
        200: "#FFFFFF",
        300: "#FFFFFF",
        400: "#EFEFEF",
        500: "#DBDBDB",
        600: "#C6C6C6",
        700: "#B2B2B2",
        800: "#9E9E9E",
        900: "#898989",
        950: "#7F7F7F",
      },
      primary: {
        DEFAULT: "#0F7802",
        50: "#EDFFEB",
        100: "#DBFED6",
        200: "#B7FEAE",
        300: "#93FD86",
        400: "#70FC5E",
        500: "#4CFC36",
        600: "#28FB0E",
        700: "#1CDC04",
        800: "#17B403",
        900: "#128C02",
        950: "#0F7802",
      },
      secondary: {
        DEFAULT: "#F5D304",
        50: "#FFFFFF",
        100: "#FFFFFF",
        200: "#FFFFFF",
        300: "#FFFFFF",
        400: "#FEF9DB",
        500: "#FEF3B3",
        600: "#FDED8B",
        700: "#FCE763",
        800: "#FCE13A",
        900: "#FBDA12",
        950: "#F5D304",
      },
    },
  },
};
export const darkMode = "class";
export const plugins = [
  nextui({
    addCommonColors: true,
  }),
];
