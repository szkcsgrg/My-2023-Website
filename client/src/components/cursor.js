import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TestImage from "../assets/utils/test.jpeg";

let developmentEnter, developmentExit;

function Cursor() {
  const [cursorVariant, setCursorVariant] = useState("default");
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
    },
    development: {
      height: 250,
      width: 250,
      x: mousePosition.x - 125,
      y: mousePosition.y - 125,
      opacity: 0.75,
      backgroundImage: `url(${TestImage})`,
      transition: { duration: 0.5 },
    },
  };

  developmentEnter = () => setCursorVariant("development");
  developmentExit = () => setCursorVariant("default");

  return (
    <motion.div
      variants={variants}
      animate={cursorVariant}
      className="cursor d-none d-lg-block"
    />
  );
}

export { developmentEnter, developmentExit };
export default Cursor;
