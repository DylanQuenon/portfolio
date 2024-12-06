import { useTranslation } from "react-i18next";

const About = () => {
    const { t } = useTranslation(); 
    return ( 
        <>
            <h1>About</h1>
            <p>{t('title')}</p>
           
        </>
     );
}
 
export default About;