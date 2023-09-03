import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import { darkEnter, darkExit } from "../components/cursor";

import testImage from "../assets/utils/Untitled.png";
import pdf from "../assets/documents/Gergő Szakács - CV.pdf";

function Development() {
  //Get all the rows from the database.
  const [reviews, setReviews] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    //Async fucntion is needed to communicate with the backend.
    const fecthAllReviews = async () => {
      try {
        const res = await axios.get("http://localhost:8800/reviews");
        setReviews(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fecthAllProjects = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/projectsdevelopment"
        );
        setProjects(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    //Call the function.
    fecthAllReviews();
    fecthAllProjects();
  }, []);

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="section row d-flex flex-column justify-content-center m-0 p-0 m-md-3 p-md-3 m-lg-5 p-lg-5"
      >
        <h2 className="z-1">Software Development</h2>
        <h2 className="d-none d-lg-block z-0">
          <span>Software Development</span>
        </h2>
      </motion.section>
      {/* Overview */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="section-longer row d-flex flex-column m-0 p-0 m-md-3 p-md-3 m-lg-5 p-lg-5"
      >
        <div className="d-flex flex-column flex-lg-row gap-3">
          <div className="col-lg-4">
            <h3>Short Overview</h3>
            <p>
              I'm a Junior website developer with a passion for crafting
              seamless online experiences. <br />
              My journey began with an oriented matura in Computer Science,
              further solidified by a Certificate as a Software Developer
            </p>
          </div>
          <p className="col-lg-8 smaller-text margin-top-075">
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
        <br />
        <br />
        <p>
          <span>From coding to creativity, I've got you covered.</span>
        </p>
        <br />
        <br />
        <p className="smaller-text">
          Currently seeking new opportunities, I'm excited to contribute my
          skills to your next project. <br /> Feel free to reach out at{" "}
          <Link to="mailto:szkcsgrg@gmail.com">info@szakacsgergo.com</Link> or{" "}
          <Link to="tel:+43 676 950 8332">+43 676 950 8332</Link>. <br />
          For a comprehensive look, feel free to access my{" "}
          <a target="_blank" href={pdf}>
            CV
          </a>{" "}
          for more details.
        </p>
      </motion.section>
      {/* Reviews */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="section-shorter dark"
        onMouseEnter={darkEnter}
        onMouseLeave={darkExit}
      >
        <div className="row m-0 p-0 py-3 m-md-3 p-md-3 m-lg-5 p-lg-5">
          <h3>
            <span>Reviews</span>
          </h3>

          <Swiper
            modules={[Navigation, Scrollbar, A11y, EffectFade]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            loopPreventsSliding={false}
            //onSwiper={(swiper) => console.log(swiper)}
            //effect="fade"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <p>{review.writer}</p>
                <q className="smaller-text">{review.quote}</q>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.section>
      {/* Projects */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="section-longer"
      >
        <div className="row d-flex flex-column m-0 p-0 py-3 m-md-3 p-md-3 m-lg-5 p-lg-5">
          <h2 className="z-1 m-b-1">Featured Projects</h2>
          <h2 className="d-none d-lg-block z-0">
            <span>Featured Projects</span>
          </h2>
          {/*
           * IMPORTANT NOTE
           * Add Background color, and change color of the cursor.
           */}

          {/*
           *IMPORTANT NOTE
           * Query from DB. TO="project-name" ORDER BY DATE DESC
           */}

          {/* Project 1 */}
          {projects.map((project) => (
            <Link
              key={project.id}
              className="project d-flex flex-column flex-md-row gap-5"
              to="/projects/RandomProject"
            >
              <div className="col-12 col-md-5 offset-md-1 d-flex flex-column justify-content-center">
                <div className="justify-content-end">
                  <h4>{project.name}</h4>
                  <p>
                    <span className="smaller-span">{project.stack}</span>
                    <br />
                    <span className="smaller-span">{project.date}</span>
                    <br />
                    <span className="smaller-span">
                      {project.developmentType}
                    </span>
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-5 d-flex justify-content-end">
                <img
                  className="img-thumbnail border-0 project-thumbnail"
                  src={project.image1}
                  alt="Project Image should be here."
                />
              </div>
            </Link>
          ))}
          <Link
            // key={project.id}
            className="project d-flex flex-column flex-md-row gap-5"
            to="/projects/RandomProject"
          >
            <div className="col-12 col-md-5 offset-md-1">
              <img
                className="img-thumbnail border-0 project-thumbnail"
                src={testImage}
                alt="Project Image should be here."
              />
            </div>
            <div className="col-12 col-md-5 d-flex flex-column justify-content-center">
              {/* <h4>{project.name}</h4> */}
              <p>
                <span className="smaller-span">
                  HTML, CSS, SASS, Bootstrap, React
                </span>
                <br />
                <span className="smaller-span">2022.03.12-2023.01.01.</span>
                <br />
                <span className="smaller-span">Freelance</span>
              </p>
            </div>
          </Link>
        </div>
      </motion.section>
    </>
  );
}

export default Development;
