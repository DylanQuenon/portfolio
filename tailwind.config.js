/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
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

        success: {
          100: '#d4edda',
          500: '#28a745',
          700: '#155724',
        },
        error: {
          100: '#f8d7da',
          500: '#dc3545',
          700: '#721c24',
        },
        warning: {
          100: '#fff3cd',
          500: '#ffc107',
          700: '#856404',
        },
        info: {
          100: '#d1ecf1',
          500: '#17a2b8',
          700: '#0c5460',
        },
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

      display:{
        "sm":{

        }
      }
      

    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    
  ],
}