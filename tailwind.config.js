/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    safelist: [
        {
            pattern: /(text|bg|shadow-s|border)-calendar-[\w-]+/,
        },
    ],
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
            "subtitle-secondary": "#eeeef5",
            "subtitle-hover": "#D8D8DC",
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
            "danger-dark": "#D34848",
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
            "calendar-green": "#4CAF50",
            "calendar-yellow": "#D4C02A",
            "calendar-orange": "#CC8400",
            "calendar-teal": "#008080",
            "calendar-indigo": "#4B0082",
            "calendar-gray": "#808080",
            "calendar-brown": "#A52A2A",
            "calendar-cyan": "#00BCD4",
            "calendar-lime": "#CDDC39",
            "calendar-amber": "#FFBF00",
            "calendar-emerald": "#50C878",
            "calendar-fuchsia": "#FF00FF",
            "calendar-magenta": "#FF00FF",
            "calendar-maroon": "#800000",
            "calendar-olive": "#808000",
            "calendar-navy": "#000080",
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
                "s-calendar-purple": "0px 4px 10px 0px rgba(63, 61, 86, 0.15)",
                "s-calendar-pink": "0px 4px 10px 0px rgba(189, 66, 143, 0.15)",
                "s-calendar-red": "0px 4px 10px 0px rgba(255, 128, 139, 0.15)",
                "s-calendar-blue": "0px 4px 10px 0px rgba(150, 152, 214, 0.15)",
                "s-calendar-green": "0px 4px 10px 0px rgba(76, 175, 80, 0.15)",
                "s-calendar-yellow": "0px 4px 10px 0px rgba(212, 192, 42, 0.15)",
                "s-calendar-orange": "0px 4px 10px 0px rgba(204, 132, 0, 0.15)",
                "s-calendar-teal": "0px 4px 10px 0px rgba(0, 128, 128, 0.15)",
                "s-calendar-indigo": "0px 4px 10px 0px rgba(75, 0, 130, 0.15)",
                "s-calendar-gray": "0px 4px 10px 0px rgba(128, 128, 128, 0.15)",
                "s-calendar-brown": "0px 4px 10px 0px rgba(165, 42, 42, 0.15)",
                "s-calendar-cyan": "0px 4px 10px 0px rgba(0, 188, 212, 0.15)",
                "s-calendar-lime": "0px 4px 10px 0px rgba(205, 220, 57, 0.15)",
                "s-calendar-amber": "0px 4px 10px 0px rgba(255, 191, 0, 0.15)",
                "s-calendar-emerald": "0px 4px 10px 0px rgba(80, 200, 120, 0.15)",
                "s-calendar-fuchsia": "0px 4px 10px 0px rgba(255, 0, 255, 0.15)",
                "s-calendar-magenta": "0px 4px 10px 0px rgba(255, 0, 255, 0.15)",
                "s-calendar-maroon": "0px 4px 10px 0px rgba(128, 0, 0, 0.15)",
                "s-calendar-olive": "0px 4px 10px 0px rgba(128, 128, 0, 0.15)",
                "s-calendar-navy": "0px 4px 10px 0px rgba(0, 0, 128, 0.15)",
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
    plugins: [require("tailwindcss-inner-border"), require("flowbite/plugin")],
};
