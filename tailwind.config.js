/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                shiva: {
                    indigo: "#1a1a2e",
                    gold: "#FFD700",
                    deep: "#050505",
                }
            },
            fontFamily: {
                cinzel: ['Cinzel', 'serif'],
                hindi: ['Rozha One', 'serif'],
            }
        },
    },
    plugins: [],
}
