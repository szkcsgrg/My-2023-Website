import React from "react";
import { motion } from "framer-motion";

function Photography() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="section row d-flex flex-column justify-content-center m-0 p-2 m-md-3 p-md-3 m-lg-5 p-lg-5"
      >
        <h2 className="z-1">Photography</h2>
        <div>
          <h3>Exciting Developments in Progress!</h3>
          <p>
            I am working hard behind the scenes to bring you something amazing.{" "}
            <br />
            Stay tuned for updates, and thank you for your patience!
            <br />
            <br />
            In the meantime, you can visit my{" "}
            <a href="https://www.instagram.com/szkcsgrg.raw/" target="_blank">
              Instagram
            </a>{" "}
            profile where I post regularly some of my favorite photos.
          </p>
        </div>
      </motion.section>
    </>
  );
}

export default Photography;
