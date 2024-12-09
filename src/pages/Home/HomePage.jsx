import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../ThemeContext";
import { useTranslation } from "react-i18next";
import TypewriterComponent from "typewriter-effect";
import Button from "../../components/Button";
import { NavLink } from "react-router-dom";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import './HomePage.scss';

const HomePage = () => {
    const { darkMode } = useContext(ThemeContext);
    const { t, i18n } = useTranslation();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    
  useEffect(() => {
    const handleMouseMove = (e) => {
      const appElement = document.querySelector('.hometracking');
      const rect = appElement.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top }); // Mets à jour la position de la souris
      }
    };

    // Ajouter l'écouteur d'événements pour suivre la souris
    window.addEventListener('mousemove', handleMouseMove);

    // Nettoyer l'écouteur d'événements au démontage du composant
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

    
    return (
        <>
            <div className={`slide py-24 ${darkMode ? 'bg-primary-dark color-quaternary-dark' : 'bg-primary-light color-quaternary-light'}`} id="home">
                <div className="wrapper flex flex-col gap-10">
                    <div className="flex flex-col gap-5">
                        {/*Jumbotron home */}
                        <div className="home_jumbotron md:w-[55%] flex-wrap flex gap-5">
                            <h1 className="home_jumbotron_high display-lg nohemi flex w-full flex-wrap items-center gap-4">
                                Dylan Quenon,
                                <img src="images/home1.webp" className="w-[120px] h-11 rounded-full object-cover" alt="Web developer at work" /> {t('home.title')}
                                {/* Typewritter */}
                                <div className={`typewritter relative flex gap-2 display-lg basis-full ${darkMode ? "color-secondary-dark" : 'color-secondary-light'} nohemi bold`}>
                                    <TypewriterComponent
                                        options={{
                                            strings: [t('home.aesthetic')],
                                            autoStart: true,
                                            loop: true,
                                        }}
                                    />
                                    {/*2e picture */}
                                    <img src="images/home2.webp" className="w-[120px] h-11 absolute top-50 right-32 rounded-full object-cover" alt="Web developer at work" />
                                </div>
                            </h1>
                        </div>
                        {/*Boutons d'actions */}
                        <div className="flex gap-5 flex-wrap">
                            <a href="/cv/CURRICULUM VITAE - Dylan QUENON.pdf" className={`transition-all ease-in-out py-2 px-4 rounded-full text-lg nohemi flex items-center gap-1 ${darkMode ? "hover:bg-purple-500 bg-secondary-dark color-primary-dark border border-[#f5f5f5]" : "border-[#232323] bg-secondary-light color-primary-light hover:bg-purple-900"}`}>{t('home.download')}<span className=" material-symbols-outlined">download</span></a>
                            <Button name={t('navLinks.about.name')} link="/about" bg={darkMode ? "bg-primary-dark" : "bg-primary-light"} color={darkMode ? "color-quaternary-dark" : "color-quaternary-light"} />
                        </div>
                    </div>
                    {/*Link*/}
                    <div className="grid sm:grid-cols-1 gap-x-9 max-md:gap-y-9 lg:grid-cols-12 gap-5 w-full">
                        {/*Link 1*/}
                        <div className="home_link col-span-4 relative">
                            <NavLink
                                to="/"
                                className="border-2 overflow-hidden border-[#f5f5f5] py-5 px-4 display-xl hanken uppercase color-primary-light flex items-end home_link_block h-[500px] relative rounded-3xl bg-center bg-no-repeat bg-cover group"
                                style={{ backgroundImage: "linear-gradient(to bottom, transparent, #012169 90%), url('images/link1.webp')" }}
                            >
                                #{t('navLinks.projects.name')}
                                <div
                                    className={`absolute inset-0 ${darkMode ? "bg-quaternary-dark color-primary-dark" : "bg-quaternary-light color-primary-light"}  -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex flex-col  gap-5 py-12 px-5  text-white`}
                                >
                                    <h2 className="display-md hanken uppercase">{t('navLinks.projects.name')}</h2>
                                    <p className="text-lg nohemi normal-case"> {t('home.projectLink')}</p>
                                    <div className={` normal-case w-fit buttonlink transition-all text-lg py-2 px-4 nohemi ease-in-out border ${darkMode ? "border-[#f5f5f5] hover:bg-[#9D78F4] hover:text-black bg-primary-dark color-quaternary-dark" : " bg-primary-light color-quaternary-light border-[#232323] hover:bg-[#8c6ade] hover:text-white "}  rounded-full flex gap-2 items-center `}
                                    >
                                        {t('home.projectButton')}
                                        <div
                                            className={`flex w-8 h-8 ${darkMode ? "bg-quaternary-dark color-primary-dark" : "bg-quaternary-light color-primary-light"} justify-center items-center p-3 rounded-full`}
                                        >
                                            <FontAwesomeIcon icon={faArrowUp} className=" rotate-45 transition-all ease-in-out" />

                                        </div>
                                    </div>

                                </div>
                            </NavLink>
                            <div className="arrow w-16 h-16 rounded-full bg-[rgba(1,33,105,0.7)] flex justify-center items-center absolute -top-6 -right-5 border-[#012169] border-2"> <ArrowOutwardIcon fontSize="large" htmlColor="#f5f5f5" /> </div>
                        </div>
                        {/* Bloc 2 */}
                        <div className="home_link col-span-3  max-md:col-span-4 flex  flex-col relative max-md:gap-9">
                            <div className="relative">
                                <NavLink to='/about' className="home_link_block border-2 border-[#f5f5f5] py-5 px-4 h-[250px] display-lg hanken color-primary-light uppercase relative flex items-end w-full lg:-translate-y-5 rounded-3xl bg-center bg-cover bg-no-repeat group overflow-hidden" style={{ backgroundImage: "linear-gradient(to bottom, transparent, #012169 90%), url('images/link2.webp')" }}>
                                    #{t('navLinks.about.name')}
                                    {/* Overlay qui se glisse par le haut */}
                                    <div className={`absolute inset-0 ${darkMode ? "bg-quaternary-dark color-primary-dark" : "bg-quaternary-light color-primary-light"} -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex flex-col gap-5 py-12 px-5 text-white`}>
                                        <h3 className="display-md hanken uppercase font-bold mb-2">{t('navLinks.about.name')}</h3>
                                        <p className="text-md normal-case nohemi">{t('home.aboutLink')}</p>
                                        <div className={`buttonlink transition-all ease-in-out py-2 px-4 rounded-full text-md normal-case nohemi flex items-center gap-1 w-fit ${darkMode ? "bg-primary-dark color-quaternary-dark hover:bg-purple-900 hover:text-white" : "bg-primary-light color-quaternary-light hover:bg-purple-900 hover:text-white"}`}>
                                            {t('home.aboutButton')}
                                        </div>
                                    </div>
                                </NavLink>

                                <div className="arrow w-16 h-16 rounded-full bg-[rgba(1,33,105,0.7)] flex justify-center items-center absolute -top-10 -right-5 border-[#012169] border-2"> <ArrowOutwardIcon fontSize="large" htmlColor="#f5f5f5" /> </div>

                            </div>

                            <div className={`home_link_block h-[250px] relative w-full ${darkMode ? "bg-tertiary-dark color-quaternary-dark" : "bg-tertiary-light color-quaternary-light"} flex justify-center items-center rounded-3xl`}>

                                <p className={`relative display-md hanken uppercase px-8`}>
                                    <span className={`z-10 absolute display-2xl hanken italic ${darkMode ? "color-secondary-dark" : "color-secondary-light"} -top-8 left-3`}>"</span>
                                    {t('home.create')}
                                    <span className={`z-10 absolute display-2xl hanken italic ${darkMode ? "color-secondary-dark" : "color-secondary-light"} right-${i18n.language === 'fr' ? '-40' : '30'} bottom-${i18n.language === 'fr' ? '3' : '5'}`}>"</span>
                                </p>

                            </div>
                        </div>
                        {/* Bloc 3 */}
                        <div className="home_link col-span-4 relative">
                                <div className="arrow z-10 w-16 h-16 rounded-full bg-[rgba(1,33,105,0.7)] flex justify-center items-center absolute -top-16 -right-5 border-[#012169] border-2"> <ArrowOutwardIcon fontSize="large" htmlColor="#f5f5f5" /> </div>
                            <div className="h-[540px] hometracking home_link_block border-2 border-[#f5f5f5] py-5 px-4 display-md hanken color-primary-light uppercase relative flex flex-col gap-5 w-full lg:-translate-y-10 rounded-3xl justify-end bg-center bg-cover bg-no-repeat group overflow-hidden" style={{ backgroundImage: "linear-gradient(to bottom, transparent, #012169 90%), url('images/link3.webp')" }}>
                                {t('home.contactLink')}
                                <div className="flex relative z-10 flex-wrap gap-5">
                                    <Button name={t('home.contactButton')} link="/contact" bg="bg-tertiary-light color-primary-dark hover:bg-purple-900 hover:text-white" />
                                    <Button name={t('home.contactButton2')} link="/about" bg="bg-transparent color-quaternary-dark hover:bg-purple-900 hover:text-white" border="border-[#f5f5f5]" />
                                </div>
                                <NavLink to="/contact" className={`tracking-element cursor-pointer flex w-[100px] h-[100px] justify-center items-center text-sm uppercase hanken ${darkMode ? 'bg-[rgba(123,123,123,0.5)] border-[#7B7B7B]' : 'bg-[rgba(206,207,186,0.5)] border-[#CECFBA]'} border-2 backdrop-blur-md rounded-full text-center`} style={{
                                    position: 'absolute',
                                    left: `${mousePosition.x  - 50 }px`, 
                                    top: `${mousePosition.y - 50}px`,   
                                    zIndex: 1, 
                                }}>
                                    {t('home.contactButton')}
                                
                                </NavLink>
    
                            </div>
                        </div>
                        {/* Bloc 4 */}
                        <span className="relative h-[500px] flex justify-center items-center max-lg:hidden col-span-1">
                        <h2 className="col-span-1  text-[100px] rotate-90  hometitle max-lg: hanken uppercase font-bold">{t('navLinks.home.name')}</h2>

                        </span>
                        



                    </div>


                </div>

            </div>

        </>
    );
}

export default HomePage;