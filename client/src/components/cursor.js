import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
// import TestImage from "../assets/utils/test.webp";

let developmentEnter, developmentExit, darkEnter, darkExit;

function Cursor() {
  const [cursorVariant, setCursorVariant] = useState("");
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      backgroundColor: "#d7942d",
    },
    development: {
      height: 16,
      width: 16,
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      opacity: 0.5,
      // backgroundImage: `url(${TestImage})`,
      transition: { duration: 0.5 },
    },
    dark: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      backgroundColor: "#f3f3f3",
      cursor: "move",
    },
  };

  developmentEnter = () => setCursorVariant("development");
  developmentExit = () => setCursorVariant("default");
  darkEnter = () => setCursorVariant("dark");
  darkExit = () => setCursorVariant("default");

  // remove the d-none from the video tag when development enter.
  return (
    <motion.div
      variants={variants}
      animate={cursorVariant}
      className="cursor z-1 d-none d-lg-block"
    >
      <video className="d-none d-block" src="">
        <source src="" />
      </video>
    </motion.div>
  );
}

export { developmentEnter, developmentExit, darkEnter, darkExit };
export default Cursor;
