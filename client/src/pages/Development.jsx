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
        className="section-longer row d-flex flex-column m-0 p-0 m-md-3 p-md-3 m-lg-5 p-lg-5"
      >
        <div className="d-flex flex-column flex-lg-row gap-3">
          <p className="col-lg-4">
            <h3>Short Overview</h3>
            I'm a Junior website developer with a passion for crafting seamless
            online experiences. <br />
            My journey began with an oriented matura in Computer Science,
            further solidified by a Certificate as a Software Developer
          </p>
          <p className="col-lg-8 smaller-text">
            With an eye for design and a knack for problem-solving, I've
            embarked on diverse projects that bring imagination to life. You can
            also read reviews from satisfied clients below, attesting to my
            dedication and expertise. <br />
            Thriving in diverse remote work environments, I've honed my ability
            to excel with equal prowess as an independent contributor and as a
            vital member of competitive, dynamic teams. My journey has
            illuminated the profound significance of collaboration, where the
            exchange of ideas fuels innovation and propels projects to
            extraordinary heights. This multifaceted experience has equipped me
            with adaptability and a holistic perspective that enriches every
            facet of my development approach.
          </p>
        </div>

        <p>
          <span>From coding to creativity, I've got you covered.</span>
        </p>

        <p className="smaller-text">
          Currently seeking new opportunities, I'm excited to contribute my
          skills to your next project. <br /> Feel free to reach out at
          <Link href="mailto:szkcsgrg@gmail.com"> info@szakacsgergo.com </Link>
          or <Link href="tel:+43 676 950 8332">+43 676 950 8332</Link>. <br />
          For a comprehensive look, feel free to access my{" "}
          <Link to="https://drive.google.com/drive/folders/1sAdNNc-l2TDtQUWr9vv6opq0c2EAIzT_?usp=drive_link">
            CV
          </Link>
          for more details.
        </p>
      </motion.section>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="section-half"
      ></motion.section>
    </>
  );
}

export default Development;
