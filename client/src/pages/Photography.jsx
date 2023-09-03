import React from "react";
import { motion } from "framer-motion";

function Photography() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="section row d-flex flex-column justify-content-center m-0 p-0 m-md-3 p-md-3 m-lg-5 p-lg-5"
      >
        <h2 className="z-1">Photography</h2>
        <h2 className="d-none d-lg-block z-0">
          <span>Photography</span>
        </h2>
        <p>
          Sadly, this part of the website is still under construction. <br />{" "}
          Please come back to this page later!
        </p>
      </motion.section>
    </>
  );
}

export default Photography;
