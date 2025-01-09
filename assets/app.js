import './bootstrap.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { initTWE } from 'tw-elements';

// Initialisation de tw-elements
initTWE();
AOS.init();

/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import './styles/app.scss';

console.log('This log comes from assets/app.js - welcome to AssetMapper! 🎉');
