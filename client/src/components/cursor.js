import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

let developmentEnter,
  developmentExit,
  darkEnter,
  darkExit,
  headerEnter,
  headerExit,
  projectEnter,
  projectExit;

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
    header: {
      height: 200,
      width: 200,
      x: mousePosition.x - 100,
      y: mousePosition.y - 100,
      backgroundColor: "#f3f3f3",
    },
    project: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      backgroundColor: "#000",
    },
  };

  developmentEnter = () => setCursorVariant("development");
  developmentExit = () => setCursorVariant("default");
  darkEnter = () => setCursorVariant("dark");
  darkExit = () => setCursorVariant("default");
  headerEnter = () => setCursorVariant("header");
  headerExit = () => setCursorVariant("default");
  projectEnter = () => setCursorVariant("project");
  projectExit = () => setCursorVariant("default");

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

export {
  developmentEnter,
  developmentExit,
  darkEnter,
  darkExit,
  headerEnter,
  headerExit,
  projectEnter,
  projectExit,
};
export default Cursor;
