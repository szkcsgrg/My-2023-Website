import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import profile from "../assets/utils/Profile.png";

function Home() {
  const CV = `${process.env.REACT_APP_BACKEND_SERVER}:8800/public/cv/Gergo%20Szakacs%20-%20CV.pdf`;

  return (
    <article className="background">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="landing d-flex justify-content-center align-items-center flex-column flex-lg-row-reverse m-1 p-2 m-md-3 p-md-3 m-lg-5 p-lg-5"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
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
      <motion.section
        initial={{ opacity: 0, x: "-100%" }}
        transition={{ duration: 2.5 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="section row d-flex flex-row flex-md-column m-0 p-2 m-md-3 p-md-3 m-lg-5 p-lg-5"
      >
        <Link to="/development">
          <h2 className="z-1">Software Development</h2>
          <p>
            After learning the basics of Programming, I met with the lovely HTML
            and CSS. At first view, I know they will be the one. Throughout my
            way, I started to go deeper and deeper. Like every other Website
            Developer, I also had the usual ways around every aspect. I tried
            both the backend and frontend as well. In the beginning, I put more
            effort into the Frontend side. At the moment, I am putting 100% of
            my power into learning React and Node with Express. I also tried
            Firebase and some Database solutions such as MySQL and MongoDB.
          </p>
        </Link>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: "100%" }}
        transition={{ duration: 2.5 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="section row d-flex flex-row flex-md-column m-0 p-2 m-md-3 p-md-3 m-lg-5 p-lg-5"
      >
        <h2 className="z-1">
          <Link to="/photography">Photography</Link>
        </h2>
        <p>
          The other passion is in connection with art. Since I know myself, I
          always wanted to create something for the world. Simplicity is the key
          for me. From that point, you can build out anything crowded or noisy.
          I tried to implement this method in my photography journey as well. I
          got my first camera from one of my family members. Shortly it became
          one of my favorite hobbies. Now I am spending my time on special
          events or taking portraits of other people. Of course, product
          photography is on the list as well. When I do not need to focus on
          objects or people, I love to take a digital version of the moment.
          Street photography and nature puts me in my comfort zone.
        </p>
      </motion.section>
    </article>
  );
}

export default Home;
