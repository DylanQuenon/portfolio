import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

  document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Sélectionner l'élément
    const aboutText = document.querySelector(".about-text");

    if (aboutText) {
      // Diviser le texte en mots
      const words = aboutText.innerText.split(" ");
      aboutText.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(" ");

      // Animation avec GSAP
      gsap.timeline({
        scrollTrigger: {
          trigger: aboutText,
          start: "top 80%", // Lancer l'animation lorsque 80% de l'élément est visible
          end: "bottom 50%",
          scrub: 1, // Animation liée au scrolling
        }
      }).from(".word", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: { each: 0.1 }, // Délais entre les mots
        

      });
    }
  });

