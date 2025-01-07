import './bootstrap.js';
// Importation des composants de tw-elements


// Importation uniquement de initTWE
import { initTWE } from 'tw-elements';

// Initialisation de tw-elements
initTWE();


/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import './styles/app.scss';

console.log('This log comes from assets/app.js - welcome to AssetMapper! 🎉');
