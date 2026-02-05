import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
  Scrollbar,
  A11y,
  FreeMode,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { darkEnter, darkExit } from "../components/cursor";

function Development() {
  const backendServer = process.env.REACT_APP_BACKEND_SERVER;
  // const CV = `${process.env.REACT_APP_BACKEND_SERVER}/public/cv/Gergo%20Szakacs%20-%20CV.pdf`;
  //Get all the rows from the database.
  const [reviews, setReviews] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    //Async fucntion is needed to communicate with the backend.
    const fecthAllReviews = async () => {
      try {
        // const res = await axios.get(
        //   `${process.env.REACT_APP_BACKEND_SERVER}/reviews`
        // );
        const res = await axios.get(`${backendServer}/reviews`);
        setReviews(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fecthAllProjects = async () => {
      try {
        const res = await axios.get(
          // `${process.env.REACT_APP_BACKEND_SERVER}/projectsdevelopment`
          `${backendServer}/projectsdevelopment`
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

  const goToTop = () => {
    console.log("goToTop function called");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".project");

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const rect = section.getBoundingClientRect();
        const isLastSection = i === sections.length - 1;
        const isBottomVisible = rect.bottom <= window.innerHeight;

        if (isBottomVisible && !isLastSection) {
          const nextSection = sections[i + 1];
          nextSection.scrollIntoView({ behavior: "smooth" });
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const rgbaColor = (color, opacity) => {
    const validColor = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(color);

    const validOpacity =
      opacity !== undefined && !isNaN(opacity) && opacity >= 0 && opacity <= 1;

    if (!validColor || !validOpacity) {
      console.error("Invalid color or opacity:", color, opacity);
      // Provide a fallback color (e.g., white) with the specified opacity or 1.0 (fully opaque)
      return "#f3f3f3";
    }

    const hexToRgb = (hex) =>
      hex
        .replace(
          /^#?([A-Fa-f0-9])([A-Fa-f0-9])([A-Fa-f0-9])$/i,
          (m, r, g, b) => `#${r}${r}${g}${g}${b}${b}`
        )
        .substring(1)
        .match(/.{2}/g)
        .map((x) => parseInt(x, 16));

    const [r, g, b] = hexToRgb(color);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const CV = `${backendServer}/public/cv/Gergo%20Szakacs%20-%20CV.pdf`;
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="section row d-flex flex-column justify-content-center m-0 p-2 m-md-3 p-md-3 mx-lg-5 px-lg-5"
      >
        <h2 className="z-1">Software Development</h2>
      </motion.section>

      {/* Overview */}
      <section id="contact" className="section-longer row d-flex flex-column m-0 p-2 m-md-3 p-md-3 mx-lg-5 px-lg-5">
        <div className="d-flex flex-column flex-lg-row gap-3 info">
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 1.5 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="col-lg-4 me-4"
          >
            <h3>Short Overview</h3>
            <p>
              I'm a website developer with a passion for crafting seamless
              online experiences. My journey began with an oriented matura in
              Computer Science, further solidified by a Certificate as a
              Software Developer.
              <br />
              <Link to="mailto:work@szakacsgergo.com">
                work@szakacsgergo.com
              </Link>
              <br />
              <Link to="tel:+43 676 950 8332">+43 676 950 8332</Link>
            </p>
            <button className="click mt-1 mt-lg-2 me-3">
              <a href="#projects">Projects</a>
            </button>
            <a
              className="click bigger-accent"
              target="_blank"
              rel="noreferrer"
              href={CV}
            >
              Resume
            </a>
          </motion.div>
          {reviews[0] ? (
            <motion.section
              initial={{ opacity: 0, x: "100%" }}
              transition={{ duration: 1.5 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="col-lg-8 margin-top-075 p-2 py-3 p-md-3 p-lg-5 section-shorter dark"
              id="reviews"
              onMouseEnter={darkEnter}
              onMouseLeave={darkExit}
            >
              <h3 className="z-2 mb-2">Reviews</h3>
              <Swiper
                modules={[
                  Autoplay,
                  Pagination,
                  Navigation,
                  Scrollbar,
                  A11y,
                  EffectFade,
                  FreeMode,
                ]}
                spaceBetween={50}
                slidesPerView={1}
                grabCursor={true}
                //freeMode={true}
                // pagination={{
                //   clickable: true,
                // }}
                // navigation={true}
                autoplay={{
                  delay: 15000,
                  disableOnInteraction: true,
                }}
                loop={true}
                scrollbar={{ draggable: true }}
                loopPreventsSliding={false}
              >
                {reviews.map((review) => {
                  if (review.reviewWriter) {
                    return (
                      <SwiperSlide key={review.id}>
                        <p className="bold">{review.reviewWriter}</p>
                        <q className="smaller-text italic">
                          {review.reviewText}
                        </q>
                      </SwiperSlide>
                    );
                  }
                  return null;
                })}
              </Swiper>
            </motion.section>
          ) : (
            <></>
          )}

          {/* <motion.p
            initial={{ opacity: 0, x: "100%" }}
            transition={{ duration: 1.5 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="col-lg-8 margin-top-075"
          >
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
          </motion.p> */}
        </div>
      </section>

      {/* Reviews */}
      {/* <section
        id="reviews"
        className="section-shorter dark"
        onMouseEnter={darkEnter}
        onMouseLeave={darkExit}
      >
        <div className="row m-0 p-2 py-3 m-md-3 p-md-3 m-lg-5 p-lg-5">
          <h3 className="z-2">Reviews</h3>
          <h3 className="d-none d-lg-block z-1">
            <span className="text-truncate">Reviews</span>
          </h3>

          <Swiper
            modules={[Autoplay, Navigation, Scrollbar, A11y, EffectFade]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            autoplay={{
              delay: 15000,
              disableOnInteraction: true,
            }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            loopPreventsSliding={false}
          >
            {reviews.map((review) => {
              if (review.reviewWriter) {
                return (
                  <SwiperSlide key={review.id}>
                    <p>{review.reviewWriter}</p>
                    <q className="smaller-text">{review.reviewText}</q>
                  </SwiperSlide>
                );
              }
              return null;
            })}
          </Swiper>
        </div>
      </section> */}

      {/* Projects */}
      {projects[0] ? (
        <section className="section-longer mt-0 mt-md-5" id="projects">
          <div className="row d-flex flex-column m-0 p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.5 }}
              className="py-3 p-md-3 p-lg-5 project-bg info"
            >
              <h2 className="z-1 my-3 my-lg-0 p-2">Featured Projects</h2>
              <h2 className="d-none d-lg-block z-0">
                <span>Featured Projects</span>
              </h2>
            </motion.div>

            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className="text-dec-none"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2.5 }}
                  whileInView={{
                    backgroundColor: rgbaColor(project.colorCode, 0.4),
                  }}
                  className="project d-flex flex-column flex-md-row align-items-center justify-content-center gap-5"
                >
                  <motion.div
                    initial={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 2 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="col-12 col-md-5 offset-md-1 d-flex flex-column px-3 pt-5 pt-md-0"
                  >
                    <div className="justify-content-end">
                      <h3 className="z-2">{project.name}</h3>
                      <p>
                        <motion.span
                          className="bold"
                          whileInView={{
                            color: rgbaColor(project.colorCode, 1),
                          }}
                        >
                          {project.stack}
                        </motion.span>
                        <br />
                        <span className="italic">
                          {project.dateStart}-{project.dateEnd}
                        </span>
                        <br />
                        <span className="italic">
                          {project.developmentType}
                        </span>
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 2 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="col-12 col-md-5 d-flex justify-content-center justify-content-md-end px-3"
                  >
                    <img
                      loading="lazy"
                      className="img-thumbnail border-0 project-thumbnail"
                      src={`${process.env.REACT_APP_BACKEND_SERVER}/${project.image1}`}
                      alt="Thumbnail of the project"
                    />
                  </motion.div>
                </motion.div>
                {/* <motion.div
                  initial={{ opacity: 0, x: "100%" }}
                  transition={{ duration: 1.5 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="col-12 col-md-5 d-flex justify-content-end px-3"
                >
                  <img
                    className="img-thumbnail border-0 project-thumbnail"
                    src={`${backendServer}/${project.image1}`}
                    alt="Thumbnail of the project"
                  />
                </motion.div> */}
              {/* </motion.div> */}
            </Link>
          ))}
        </div>
      </section>
    ) : ( "" )}
    </>
  );
}

export default Development;
