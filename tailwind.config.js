/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.js",
    "./templates/**/*.html.twig",

  ],
  darkMode: 'class', // Utilisation de la préférences de l'utilisateur
  theme: {
    extend: {
      colors: {
        // Couleurs pour le thème clair
        'primary-light': '#f5f5f5',
        'secondary-light': '#341087',
        'tertiary-light': '#cecfba',
        'quaternary-light': '#232323',

        // Couleurs pour le thème sombre
        'primary-dark': '#232323',
        'secondary-dark': '#9D78F4',
        'tertiary-dark': '#7B7B7B',
        'quaternary-dark': '#f5f5f5',
      },
      fontFamily: {
        hanken: ['Hanken Grotesk', 'sans-serif'],
        nohemi: ['Nohemi', 'sans-serif'],
        'nohemi-medium': ['Nohemi Medium', 'sans-serif'],
        'nohemi-light': ['Nohemi Thin', 'sans-serif'],
      },
      boxShadow: {
        'shadow-light': '0 4px 10px rgba(0, 0, 0, 0.15)', // Ombre claire
        'shadow-dark': '0 4px 10px rgba(255, 255, 255, 0.15)', // Ombre sombre
      },

    },
  },
  plugins: [
 
  ],
}