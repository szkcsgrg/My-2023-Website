import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import profile from "../assets/utils/Profile.png";

function Home() {
  const CV = `${process.env.REACT_APP_BACKEND_SERVER}:8800/public/cv/Gergo%20Szakacs%20-%20CV.pdf`;

  return (
    <article className="landing">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="landing d-flex justify-content-center align-items-center flex-column flex-lg-row-reverse m-1 p-2 m-md-3 p-md-3 m-lg-5 p-lg-5"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="col-12 col-lg-7"
        >
          <img className="profile-img" src={profile} alt="" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5 }}
          className="col-12 col-lg-5"
        >
          <h1>Gergő Szakács</h1>
          <p>
            A passionate <Link to="/development">Developer</Link> and{" "}
            <Link to="/photography">Photographer</Link> from Hungary. <br />
          </p>
          <p className="simple-link">
            Feel free to reach out at{" "}
            <Link to="mailto:work@szakacsgergo.com">work@szakacsgergo.com</Link>{" "}
            or <Link to="tel:+43 676 950 8332">+43 676 950 8332</Link>. <br />
            For a comprehensive look, feel free to access my{" "}
            <a target="_blank" rel="noreferrer" href={CV}>
              CV
            </a>{" "}
            for more details.
          </p>
        </motion.div>
      </motion.section>
    </article>
  );
}

export default Home;
