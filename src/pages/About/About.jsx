import { useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../ThemeContext";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faLightbulb, faMountain } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  const { t, i18n } = useTranslation();
  const { darkMode } = useContext(ThemeContext);


  // Références pour les animations
  const textRef = useRef(null);


  useEffect(() => {
    // Enregistrer les plugins GSAP
    gsap.registerPlugin(ScrollTrigger);

    document.title = `Dylan Quenon - ${t("navLinks.about.name")}`;

    // Diviser le texte en mots
    const words = textRef.current.innerText.split(" ");
    textRef.current.innerHTML = words
      .map((word) => `<span class="word">${word}</span>`)
      .join(" ");

    // Animation GSAP
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    // Animation des mots
    tl.from(
      ".word",
      {
        opacity: 0.25,
        y: 20,
        duration: 0.5,
        stagger: { each: 0.1 },
        color: darkMode ? "#F8F8F8" : "#797272",
      },
      0
    );

    // Animation des images

  }, [darkMode, t]);

  // Déterminer la classe en fonction du mode
  const modeClass = darkMode ? "color-secondary-dark" : "color-secondary-light";

  // Remplacer `{{class}}` dans le texte
  const processedTitle = t("about.title").replace(/{{class}}/g, modeClass);

  const cardData = [
    {
      icon: faMountain,
      title: "about.title1",
      text: "about.text1"
    },
    {
      icon: faBrain,
      title: "about.title2",
      text: "about.text2"
    },
    {
      icon: faLightbulb,
      title: "about.title3",
      text: "about.text3"
    }
  ];

  

  return (
    <>
      {/* <Helmet>
        <title>Dylan Quenon - {t("navLinks.about.name")}</title>
      </Helmet> */}
      <div
        className={`slide ${darkMode
            ? "bg-primary-dark color-quaternary-dark"
            : "bg-primary-light color-quaternary-light"
          }`}
      >
        <div className="wrapper py-16 flex flex-col gap-24 ">
          <div className="container_about flex flex-col gap-10">
            <h2
              className="container_about_title display-xl hanken uppercase w-4/5"
            >
              <div dangerouslySetInnerHTML={{ __html: processedTitle }}></div>
            </h2>
            <div className="flex flex-wrap items-center h-fit w-full justify-between">
              <div className="max-lg:w-full w-1/2 ">
                <div className="relative about_jumbotron min-h-[500px]">
                  <div className={`w-[350px] h-[350px] absolute top-0 rounded-full ${darkMode ? "bg-[#3C3C3C]" : "bg-white"}`}></div>
                  <div className="flex gap-10 z-10 absolute top-[20%] max-lg:-right-[2%] -right-[10%] w-full flex-wrap">
                    <svg
                      width="106"
                      height="106"
                      viewBox="0 0 106 106"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M94.1128 86.3333C96.2428 82.1661 97.4444 77.4456 97.4444 72.4444C97.4444 55.5689 83.7644 41.8889 66.8889 41.8889C50.0133 41.8889 36.3333 55.5689 36.3333 72.4444C36.3333 89.32 50.0133 103 66.8889 103H103C103 103 97.4444 97.4444 94.1906 86.4956M91.0556 53C91.6022 50.3072 91.8889 47.5206 91.8889 44.6667C91.8889 21.6548 73.2339 3 50.2222 3C27.2103 3 8.55556 21.6548 8.55556 44.6667C8.55556 49.5367 9.39106 54.2117 10.9264 58.5556C16.8943 75.2872 3 86.3333 3 86.3333H39.1111"
                        stroke={` ${darkMode ? "white" : "black"} `}
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex flex-col gap-3 w-full">
                      <p className="text-md nohemi uppercase">
                        {t("about.subtext")}
                      </p>
                      <p
                        ref={textRef}
                        className={`max-lg:w-full w-4/5 display-xs ${darkMode ? "color-secondary-dark" : "color-secondary-light"} nohemi bold`}
                      >
                        {(t("about.text"))}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
              <div className="max-lg:w-full w-1/2 h-full flex justify-end">
                <div className="relative h-full">
                  <img src="images/about.webp" className="w-[500px] h-[500px] rounded-3xl object-cover" alt="PC with a website" />
                  <NavLink to="/projects" className="absolute rotateLink max-lg:top-[50%] max-lg:left-[50%] max-lg:-translate-x-1/2 max-lg:-translate-y-1/2 top-[30%] -left-[18.5%] ">
                    <div className={`circle-rotate w-[240px] h-[240px] z-10 rounded-full ${darkMode ? 'bg-secondary-dark' : 'bg-secondary-light'} transition-all ease-in-out flex items-center justify-center ${darkMode ? 'darkHover' : 'lightHover'}`} style={{ backgroundImage: `url(images/${i18n.language === 'fr' ? 'bgfrench.svg' : 'bgeng.svg'})`, backgroundPosition: 'center center', backgroundSize: 'fill', backgroundRepeat: 'no-repeat' }}>
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] rotate-0 animate-none">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#F5F5F5" className="w-16">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>

                    </div>


                  </NavLink>


                </div>

              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 place-i max-lg:grid-cols-1 gap-8">
          {cardData.map((card, index) => (
            <div key={index} className={`col-span-4 ${darkMode ? "bg-[#3c3c3c] color-quaternary-dark" : "bg-primary-light color-secondary-light "} rounded-lg max-lg:col-span-1 p-5 flex flex-col gap-5`} style={{ boxShadow: darkMode ? '0px 4px 25px rgba(157, 120, 244, 0.2)' : '0px 4px 25px rgba(52, 16, 135, 0.2)' }}>
              {/* Icon */}              <div className="block-icon flex justify-center w-12 h-12 bg-secondary-light color-primary-light items-center rounded-md ">
                <FontAwesomeIcon icon={card.icon} className="transition-all ease-in-out" />
              </div>
              {/* Title and Text */}
              <div className="flex flex-col gap-2">
                <h3 className={`text-xl hanken uppercase font-bold ${darkMode ? "color-secondary-dark" : "color-secondary-light"}`}>
                  {t(card.title)}
                </h3>
                <p className="text-lg nohemi font-bold">
                  {t(card.text)}
                </p>
              </div>
            </div>
          ))}

          </div>


        </div>
      </div>
      <div className="slide">


      </div>
      <div className="slide"></div>
      <div className="slide"></div>

    </>
  );
};

export default About;
