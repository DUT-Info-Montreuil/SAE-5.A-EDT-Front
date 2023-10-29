/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ["./src/**/*.{html,ts}"],
    darkMode: false,
    theme: {
        borderWidth: {
            DEFAULT: "1px",
            0: "0",
            1: "1px",
            2: "2px",
            4: "4px",
            8: "8px",
        },
        colors: {
            // Base
            transparent: "transparent",
            white: "#FFFFFF",

            // Custom
            primary: "#5E81F4",
            "primary-hover": "#3255C6",

            secondary: "#484796",

            grey: "#6C6773",

            accent: "#322F37",
            body: "#131336",
            medium: "#A2A2C3",
            subtitle: "#E9E9EF",
            light: "#F5F5FB",
            black: "#000000",

            warning: "#FF9F10",
            "warning-light-1": "#FFEDD2",
            "warning-light-2": "#FFFCF8",

            danger: "#FA5353",
            "danger-light-1": "#F8E8E8",
            "danger-light-2": "#FFF9F8",

            info: "#4162FF",
            "info-light-1": "#E8EBF8",
            "info-light-2": "#F8FBFF",

            success: "#4EC53B",
            "success-light-1": "#E6F5E6",
            "success-light-2": "#F8FFF8",
        },
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                sm: "2rem",
                lg: "4rem",
                xl: "5rem",
                "2xl": "6rem",
            },
        },
        extend: {
            aspectRatio: {
                "4/3": "4/3",
            },
            boxShadow: {
                card: "0px 8px 16px 0px rgba(0, 0, 0, 0.03)",
            },
            lineHeight: {
                12: "3rem",
                13: "3.25rem",
                14: "3.5rem",
                16: "4rem",
                18: "4.5rem",
            },
            margin: {
                18: "4.5rem",
            },
            minWidth: {
                18: "18rem",
            },
            width: {
                120: "30rem",
            },
        },
        fontFamily: {
            aileron: ["Aileron"],
        },
        screens: {
            xs: "390px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },
    },
    plugins: [require("tailwindcss-inner-border"), require("@tailwindcss/line-clamp"), require("flowbite/plugin")],
};
