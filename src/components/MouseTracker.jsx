import React, { useEffect, useState } from "react";

const MouseTracker = ({ containerClassName, children, style }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const container = document.querySelector(`.${containerClassName}`);
      if (container) {
        const rect = container.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [containerClassName]);

  return (
    <div
      className="tracking-element"
      style={{
        position: "absolute",
        left: `${mousePosition.x - 260}px`, // Ajuste la position pour centrer
        top: `${mousePosition.y - 260}px`,
        zIndex: 1,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default MouseTracker;
