import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Button = ({ name, link, bg, color }) => {
    const { darkMode } = useContext(ThemeContext);

    // Couleurs par défaut si `bg` ou `color` ne sont pas spécifiés
    const defaultBg = darkMode ? "bg-secondary-dark" : "bg-secondary-light";
    const defaultColor = darkMode ? "color-quaternary-dark" : "color-quaternary-light";

    return (
        <NavLink
            to={link}
            className={`buttonlink transition-all text-lg py-2 px-4 nohemi ease-in-out border ${darkMode ? "border-[#f5f5f5] hover:bg-[#9D78F4] hover:text-black" : "border-[#232323] hover:bg-[#8c6ade] hover:text-white "}  rounded-full flex gap-2 items-center ${bg || defaultBg} ${color || defaultColor}`}
        >
            {name}
            <div
                className={`flex w-8 h-8 ${darkMode ? "bg-quaternary-dark color-primary-dark" : "bg-quaternary-light color-primary-light"} justify-center items-center p-3 rounded-full`}
            >
                <FontAwesomeIcon icon={faArrowUp} className=" rotate-45 transition-all ease-in-out" />
               
            </div>
        </NavLink>
    );
};

export default Button;
