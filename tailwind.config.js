/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    //Añadimos esta linea que añadira todos los archivos que sean js y jsx de src
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

