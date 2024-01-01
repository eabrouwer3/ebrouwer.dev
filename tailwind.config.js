/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        'header': "'Lato', sans-serif",
        'sans': "'Roboto', sans-serif",
        'mono': "'Source Code Pro', monospace",
      },
      colors: {
        'skalex': '#32a852',
        'hover-link': '#1c5ddd',
        'link': '#3071f1',
      },
      spacing: {
        '9.5': '2.375rem',
        '16.5': '4.125rem',
        '17': '4.25rem',
        '18': '4.5rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
