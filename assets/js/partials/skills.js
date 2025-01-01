import gsap from 'gsap';
const parallaxElements = document.querySelectorAll('.parallax .scroller');

// Variables pour le défilement
let lastScrollY = window.scrollY;
let baseVelocity = 1; // Vitesse de défilement de base

// Fonction d'animation
function animateParallax() {
  const currentScrollY = window.scrollY;
  const scrollSpeed = currentScrollY - lastScrollY; // Vitesse du défilement vertical
  lastScrollY = currentScrollY;

  parallaxElements.forEach((el, index) => {
    const directionFactor = index % 2 === 0 ? 1 : -1; // Alterne la direction
    const currentX = parseFloat(el.dataset.x || '0'); // Récupère la position actuelle
    const newX = currentX + scrollSpeed * baseVelocity * directionFactor; // Calcule la nouvelle position
    el.dataset.x = newX; // Stocke la nouvelle position

    // Applique la transformation
    el.style.transform = `translateX(${newX}px)`;
  });

  requestAnimationFrame(animateParallax); // Boucle l'animation
}

// Initialisation
animateParallax();
document.addEventListener("DOMContentLoaded", function () {
    const progressCircles = document.querySelectorAll(".progress-circle");
  
    // Fonction pour animer la jauge et le compteur
    function animateProgress(circle, targetPercentage) {
      const progressBar = circle.querySelector(".progress-bar");
      const progressText = circle.querySelector(".progress-text");
  
      // Paramètres d'animation
      let currentOffset = 100; // Commence vide
      let currentPercentage = 0; // Commence à 0%
      const animationDuration = 1000; // Durée totale de l'animation (en ms)
      const frameRate = 60; // 60 FPS
      const steps = animationDuration / (1000 / frameRate); // Nombre d'étapes
      const offsetStep = (100 - (100 - targetPercentage)) / steps; // Écart par étape
      const percentageStep = targetPercentage / steps; // Incrément du pourcentage
  
      // Réinitialiser la jauge avant l'animation
      progressBar.style.strokeDashoffset = 100;
      progressText.textContent = "0%";
  
      // Animation avec requestAnimationFrame
      function step() {
        currentOffset -= offsetStep;
        currentPercentage += percentageStep;
  
        // Mise à jour de la jauge et du texte
        progressBar.style.strokeDashoffset = Math.max(100 - currentPercentage, 0);
        progressText.textContent = `${Math.min(Math.round(currentPercentage), targetPercentage)}%`;
  
        // Continuer l'animation tant que le pourcentage n'est pas atteint
        if (currentPercentage < targetPercentage) {
          requestAnimationFrame(step);
        }
      }
  
      // Lancer l'animation
      step();
    }
  
    // Intersection Observer pour détecter la visibilité
    const observerOptions = {
      root: null, // Utilise le viewport comme référence
      rootMargin: "0px",
      threshold: 0.1, // Au moins 10% visible
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const circle = entry.target;
          const percentage = parseInt(circle.getAttribute("data-percentage"), 10);
  
          // Lancer l'animation à chaque fois que l'élément entre dans le viewport
          animateProgress(circle, percentage);
        }
      });
    }, observerOptions);
  
    // Observer chaque jauge
    progressCircles.forEach((circle) => observer.observe(circle));
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const parallaxElements = document.querySelectorAll(".parallax");
  
    // Variables pour suivre la vitesse du défilement
    let lastScrollY = 0;
    let lastDeltaY = 0;
  
    parallaxElements.forEach((parallax) => {
      const scroller = parallax.querySelector(".scroller");
      const velocity = parseFloat(parallax.getAttribute("data-velocity")) || 1;
  
      // Clone les éléments pour un défilement continu
      const spans = scroller.querySelectorAll("span");
      spans.forEach((span) => {
        const clone1 = span.cloneNode(true);
        const clone2 = span.cloneNode(true);
        scroller.appendChild(clone1);
        scroller.appendChild(clone2);
      });
  
      // Configuration de l'animation GSAP
      gsap.to(scroller, {
        xPercent: -100,
        ease: "none",
        duration: 20 / Math.abs(velocity),
        repeat: -1,
        modifiers: {
          xPercent: gsap.utils.wrap(-100, 0), // Loop l'animation infiniment
        },
      });
  
      // Ajuster la vitesse en fonction du défilement
      window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const deltaY = scrollY - lastScrollY;
        lastScrollY = scrollY;
  
        if (Math.abs(deltaY) > Math.abs(lastDeltaY)) {
          // Change la durée de l'animation selon la vitesse de défilement
          gsap.to(scroller, {
            overwrite: true,
            duration: Math.max(0.5, 20 / Math.abs(deltaY + 1)), // Durée dynamique
            xPercent: "-=" + (velocity * deltaY) / 5,
          });
        }
  
        lastDeltaY = deltaY;
      });
    });
  });