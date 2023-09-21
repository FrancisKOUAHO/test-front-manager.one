/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                'primary': '#13111C',
                'secondary': '#37132E',
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

