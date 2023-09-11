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
    return <span></span>;
  }

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="section d-flex justify-content-center flex-column"
      >
        <div className="row m-0 p-0 py-3 m-md-3 p-md-3 m-lg-5 p-lg-5">
          <h2 className="z-1">{project.name}</h2>
          <h2 className="d-none d-lg-block z-0">
            <span>{project.name}</span>
          </h2>
        </div>
      </motion.section>
      <section className="parallax"></section>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="section d-flex justify-content-center flex-column"
      >
        <div className="row m-0 p-0 py-3 m-md-3 p-md-3 m-lg-5 p-lg-5">
          <h3>Project Overview</h3>
        </div>
      </motion.section>
    </>
  );
}

export default Project;
