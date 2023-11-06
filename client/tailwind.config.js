/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primaryGreen' : '#1ED760',
        'secondaryGreen' : '#0E923C',
        'lightDark' : '#41403D',
        'primaryDark' : '#2F2E2C',
        'secondaryDark' : '#262523' //,

      },
      borderWidth: {
        '1' : '1px',
        '3': '3px',
      },
    },
  },
  plugins: [],
}

