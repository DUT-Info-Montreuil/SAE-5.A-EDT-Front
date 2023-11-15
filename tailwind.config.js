/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ["./src/**/*.{html,ts}"],
    darkMode: "class",
    theme: {
        borderWidth: {
            DEFAULT: "1px",
            0: "0",
            0.5: "0.5px",
            1: "1px",
            2: "2px",
            4: "4px",
            8: "8px",
        },
        colors: {
            // Base
            transparent: "transparent",
            white: "#FFFFFF",
            black: "#000000",

            // Custom - Light Mode
            primary: "#5E81F4",
            "primary-light-1": "#BBC7F4",
            "primary-hover": "#3255C6",
            "primary-dark": "#333A54",
            secondary: "#484796",
            grey: "#6C6773",
            dark: "#141414",
            accent: "#322F37",
            body: "#131336",
            medium: "#A5A5A5",
            subtitle: "#E9E9EF",
            light: "#F5F5FB",

            // Custom - Dark Mode
            "body-light": "#FAFAFA",
            "grey-dark": "#444444",
            "subtitle-dark": "#6A6A6A",
            "light-dark": "#252525",

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

            // Custom - Calendar Item
            "calendar-purple": "#3F3D56",
            "calendar-pink": "#BD428F",
            "calendar-red": "#FF808B",
            "calendar-blue": "#9698D6",
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
                purple: "0px 4px 10px 0px rgba(63, 61, 86, 0.15)",
                pink: "0px 4px 10px 0px rgba(189, 66, 143, 0.15)",
                red: "0px 4px 10px 0px rgba(255, 128, 139, 0.15)",
                blue: "0px 4px 10px 0px rgba(150, 152, 214, 0.15)",
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
            minHeight: {
                18: "18rem",
            },
            width: {
                120: "30rem",
            },
            fontSize: {
                xxs: "10px",
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
