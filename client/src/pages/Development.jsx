import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Development() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="section row d-flex flex-column justify-content-center m-0 p-0 m-md-3 p-md-3 m-lg-5 p-lg-5"
      >
        <h2 className="z-1">Sofware Development</h2>
        <h2 className="d-none d-lg-block z-0">
          <span>Sofware Development</span>
        </h2>
      </motion.section>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="section row d-flex flex-column m-0 p-0 m-md-3 p-md-3 m-lg-5 p-lg-5"
      >
        <h3>Short Overview</h3>
      </motion.section>
    </>
  );
}

export default Development;
