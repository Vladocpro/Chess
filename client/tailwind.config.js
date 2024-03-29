/** @type {import('tailwindcss').Config} */
export default {
   content: ["./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            'primaryGreen': '#1ED760',
            'secondaryGreen': '#0E923C',
            'lightDark': '#41403D',
            'primaryDark': '#2F2E2C',
            'secondaryDark': '#262523',

            'mainBg': '#232527',
            'primary': '#2A3033',
            'primaryLight': '#3A4247',
            'header': '#0B1418',
            'horizontal': '#313537',
            'input': '#52514E'
         },
         borderWidth: {
            '1': '1px',
            '3': '3px',
            '5': '5px',
            '6': '6px',
            '7': '7px',
         },
         outlineWidth: {
            '3': '3px'
         },
         strokeWidth: {
            '1.5': '1.5px'
         }

      },
   },
   plugins: [],
}

