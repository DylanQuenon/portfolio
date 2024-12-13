
import React, { useContext } from "react";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { ThemeContext } from "../ThemeContext";

const ArrowBlink = () => {
    const { darkMode } = useContext(ThemeContext);
  return (
    <div className="arrows-container relative flex max-lg:hidden w-full justify-between">
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="arrow" key={index}>
          <div className="arrow-part arrow-1"><KeyboardDoubleArrowDownIcon sx={{fontSize: 80 }} className={`${darkMode ? "stroke-[rgb(157,120,244,0.5)]" : "stroke-[rgb(52,16,135,0.3)]"}`}/></div>        </div>
      ))}
    </div>
  );
};

export default ArrowBlink;
