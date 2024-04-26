/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                AbrilFatface: ["Abril Fatface", "serif"],
                DMSans: ["DM Sans", "sans-serif"],
                AbhayaLibre: ["Abhaya Libre", "serif"],
            },
            screens: {
                "2xs": "395px",
                xs: "475px",
            },
        },
    },
    darkMode: "class",
    plugins: [nextui()],
};
