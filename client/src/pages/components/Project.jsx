import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/projectsdevelopment/` + id
        );
        setProject(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProject();
  }, [id]);

  if (project === null) {
    return (
      <span>
        This Poject is not exsisting. <br />
        Please go back to the previous site to choose an real one.
      </span>
    );
  }
  const parallax1 = {
    backgroundImage: `url("http://localhost:8800/${project.image2}")`,
  };

  return (
    <section className="parallax-wrapper">
      <motion.section
        key={project.id}
        // initial={{ opacity: 0 }}
        // whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="landing-shorter z-1 d-flex justify-content-center flex-column"
      >
        <div className="row m-0 p-2 py-3 m-md-3 p-md-3 m-lg-5 p-lg-5">
          <h2 className="z-2">{project.name}</h2>
          <h2 className="d-none d-lg-block z-1">
            <span>{project.name}</span>
          </h2>
        </div>
      </motion.section>
      <section className="parallax z-0" style={parallax1}></section>
      <motion.section
        //initial={{ opacity: 0 }}
        //whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="section-longer d-flex justify-content-center flex-column"
      >
        <div className="row m-0 p-2 py-3 m-md-3 p-md-3 m-lg-5 p-lg-5">
          <h3>Project Overview</h3>
          <p className="description col-12">
            <pre>{project.description1}</pre>
          </p>
        </div>
      </motion.section>
      <section className="section row m-0 p-2 py-3 m-md-3 p-md-3 m-lg-3 p-lg-3 d-flex justify-content-center text-center">
        <div className="col-10 col-md-6 text-center">
          <img
            className="rep-image text-center"
            src={`http://localhost:8800/${project.image3}`}
          />
        </div>
        <div className="col-10 col-md-6 mt-lg-5 mt-0 text-center">
          <img
            className="rep-image text-center"
            src={`http://localhost:8800/${project.image4}`}
          />
        </div>
      </section>
      <section className="section-longer d-flex justify-content-center flex-column">
        <div className="row m-0 p-2 py-3 m-md-3 p-md-3 m-lg-5 p-lg-5">
          <h3>Journey</h3>
          <p className="description col-12">
            <pre>{project.description2}</pre>
          </p>
          <p className="d-flex justify-content-evenly justify-content-md-start gap-md-3">
            <a target="_blank" href={project.href1}>
              Source Code
            </a>

            <a target="_blank" href={project.href2}>
              Launch Project
            </a>
          </p>
        </div>
      </section>
    </section>
  );
}

export default Project;
