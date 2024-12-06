import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { useTranslation } from "react-i18next";
import TypewriterComponent from "typewriter-effect";
import Button from "../../components/Button";

const HomePage  = () => {
    const { darkMode } = useContext(ThemeContext);
    const { t } = useTranslation();
    return ( 
        <>
            <div className={`slide py-24 ${darkMode ? 'bg-primary-dark color-quaternary-dark': 'bg-primary-light color-quaternary-light'}`} id="home">
                <div className="wrapper">
                    <div className="flex flex-col gap-5">
                        {/*Jumbotron home */}
                        <div className="home_jumbotron md:w-[55%] flex-wrap flex gap-5">
                            <div className="home_jumbotron_high display-lg nohemi flex w-full flex-wrap items-center gap-4">
                                Dylan Quenon, 
                                <img src="images/home1.webp" className="w-[120px] h-11 rounded-full object-cover" alt="Web developer at work" /> {t('home.title')} 
                                {/* Typewritter */}
                                <div className={`typewritter relative flex gap-2 display-lg basis-full ${darkMode ? "color-secondary-dark": 'color-secondary-light'} nohemi bold`}>
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
                            </div>
                        </div>
                        {/*Boutons d'actions */}
                        <div className="flex gap-5 flex-wrap">
                            <a href="/cv/CURRICULUM VITAE - Dylan QUENON.pdf" className={`transition-all ease-in-out py-2 px-4 rounded-full text-lg nohemi flex items-center gap-1 ${darkMode ? "hover:bg-purple-500 bg-secondary-dark color-primary-dark border border-[#f5f5f5]":"border-[#232323] bg-secondary-light color-primary-light hover:bg-purple-900"}`}>{t('home.download')}<span className=" material-symbols-outlined">download</span></a>
                            <Button name={t('navLinks.about.name')} link="/about" bg={darkMode ? "bg-primary-dark" : "bg-primary-light"} color={darkMode ? "color-quaternary-dark" : "color-quaternary-light"} />
      
                        </div>
                    </div>
                </div>

            </div>

        </> 
    );
}
 
export default HomePage;