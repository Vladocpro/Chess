/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primaryGreen' : '#1ED760',
        'secondaryGreen' : '#0E923C',
        'primaryDark' : '#242424',
        'secondaryDark' : '#5B5B5B',
      },
      borderWidth: {
        '1' : '1px',
        '3': '3px',
      },
    },
  },
  plugins: [],
}

