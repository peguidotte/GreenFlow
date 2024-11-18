/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adicione esta linha para incluir arquivos .jsx
  ],
  theme: {
    extend: {
      colors: {
        'dark-green': '#3C8500',
        'light-green': '#B8F164',
        'mid-green': '#85D22C',
        'yellow': '#FFFE65',
        'gray': '#A6A6A6',
      },
    },
  },
  plugins: [],
}
