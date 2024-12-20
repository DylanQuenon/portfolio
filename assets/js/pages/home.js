
// Typewriter effect with cursor and loop
const typewriterElements = document.querySelectorAll('.typewritter');

typewriterElements.forEach(element => {
    const text = element.textContent; // initial text
    const cursor = document.querySelector('.cursor');

    element.textContent = ''; 

    let index = 0;
    const speed = 100;
    const eraseSpeed = 50; 
    const pauseTime = 1000;

    //typing function
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else {
            setTimeout(erase, pauseTime);
        }
    }

    // erase function
    function erase() {
        if (element.textContent.length > 0) {
            element.textContent = element.textContent.slice(0, -1); 
            setTimeout(erase, eraseSpeed);
        } else {
            index = 0; 
            setTimeout(type, pauseTime); // Restart
        }
    }

    // Fonction pour faire clignoter le curseur sans effacer
    function blinkCursor() { // Garder le curseur visible même pendant l'animation de suppression
        if (element.textContent.length === 0) {
            cursor.style.visibility = 'visible'; // S'assurer que le curseur est visible même pendant l'effacement
        } else {
            cursor.style.visibility = cursor.style.visibility === 'visible' ? 'hidden' : 'visible'; // Alterner le curseur
        }
    }

    setInterval(blinkCursor, 500); // Alterner la visibilité du curseur toutes les 500ms

    type(); // Démarrer l'animation de frappe
});

// Fonction de suivi de la souris pour plusieurs conteneurs
function MouseTracker(containerClass) {
    const trackingElements = document.querySelectorAll(`.${containerClass} .tracking-element`);

    trackingElements.forEach((trackingElement) => {
        let mousePosition = { x: 0, y: 0 };

        const container = trackingElement.closest(`.${containerClass}`);

        if (trackingElement && container) {
            const handleMouseMove = (e) => {
                const rect = container.getBoundingClientRect();

                // Vérifie que la souris est à l'intérieur du conteneur
                if (e.clientX >= rect.left && e.clientX <= rect.right &&
                    e.clientY >= rect.top && e.clientY <= rect.bottom) {
                    mousePosition = {
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top
                    };
                    trackingElement.style.transform = `translate(-50%, -50%)`;
                    trackingElement.style.left = `${mousePosition.x}px`;
                    trackingElement.style.top = `${mousePosition.y}px`;
                }
            };

            container.addEventListener('mousemove', handleMouseMove);
            return () => {
                container.removeEventListener('mousemove', handleMouseMove);
            };
        }
    });
}


MouseTracker('hometracking');
MouseTracker('app_container');

