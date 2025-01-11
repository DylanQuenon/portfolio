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

function adjustMarginBottom() {
    const footer = document.querySelector('.footer');
    const content = document.getElementById('content');

        const footerHeight = footer.offsetHeight; 
        content.style.marginBottom = `${footerHeight}px`; 
}

window.addEventListener('load', adjustMarginBottom);
window.addEventListener('resize', adjustMarginBottom);
