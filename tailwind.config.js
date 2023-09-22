/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                'primary': '#13111C',
                'secondary': '#32142E',
            },
            container: {
                center: true,
                padding: '2rem',
            },
            screens: {
                sm: '640px',
                md: '768px',
            },
            fontFamily: {
                'sans': ['Roboto', 'sans-serif'],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}

