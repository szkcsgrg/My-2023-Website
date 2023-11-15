import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { projectEnter, projectExit } from "../../components/cursor";

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_SERVER}:8800/projectsdevelopment/` +
            id
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
    backgroundImage: `url("${process.env.REACT_APP_BACKEND_SERVER}:8800/${project.image2}")`,
  };

  const MarkdownWithCustomStyles = ({ markdownContent, colorCode }) => {
    const customComponents = {
      em: ({ node, ...props }) => {
        return (
          <span
            style={{
              fontSize: "calc(100% + 0.05vw + 0.05vh)",
              color: colorCode,
            }}
          >
            {props.children}
          </span>
        );
      },
    };

    return (
      <ReactMarkdown components={customComponents}>
        {markdownContent}
      </ReactMarkdown>
    );
  };

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

  return (
    <section
      className="parallax-wrapper project-container"
      onMouseEnter={projectEnter}
      onMouseLeave={projectExit}
    >
      <motion.section
        key={project.id}
        transition={{ duration: 1.5 }}
        className="landing-shorter z-1 d-flex justify-content-center flex-column"
      >
        <div className="row m-0 p-2 py-3 m-md-3 p-md-3 m-lg-5 p-lg-5">
          <h2 className="z-2">{project.name}</h2>
          <h2 className="d-none d-lg-block z-1">
            <span className="text-truncate">{project.name}</span>
          </h2>
          <p className="d-flex justify-content-between my-1">
            <span style={{ color: rgbaColor(project.colorCode, 1) }}>
              {project.stack}
            </span>
            <span style={{ color: rgbaColor(project.colorCode, 1) }}>
              {project.dateStart}-{project.dateEnd} {project.developmentType}
            </span>
          </p>
        </div>
      </motion.section>
      <section className="parallax z-0" style={parallax1}></section>
      <motion.section
        transition={{ duration: 1.5 }}
        className="section-longer d-flex justify-content-center flex-column"
      >
        <div className="row m-0 p-2 py-3 m-md-3 p-md-3 m-lg-5 p-lg-5 cursor-default">
          <h3 className="my-2">Project Overview</h3>
          <p className="description col-12">
            <pre>
              <MarkdownWithCustomStyles
                markdownContent={project.description1}
                colorCode={project.colorCode}
              />
            </pre>
          </p>
        </div>
      </motion.section>
      <section className="section row m-0 p-2 py-3 m-md-3 p-md-3 m-lg-3 p-lg-3 d-flex justify-content-center text-center">
        <div className="col-10 col-md-6 text-center">
          <img
            className="rep-image text-center"
            alt="UI element"
            src={`${process.env.REACT_APP_BACKEND_SERVER}:8800/${project.image3}`}
          />
        </div>
        <div className="col-10 col-md-6 mt-lg-5 mt-0 text-center">
          <img
            alt="UI element"
            className="rep-image text-center"
            src={`${process.env.REACT_APP_BACKEND_SERVER}:8800/${project.image4}`}
          />
        </div>
      </section>
      <section className="section-longer d-flex justify-content-center flex-column">
        <div className="row m-0 p-2 py-3 m-md-3 p-md-3 m-lg-5 p-lg-5">
          <h3 className="my-2">Development Journey</h3>
          <p className="description col-12">
            <pre>
              <MarkdownWithCustomStyles
                markdownContent={project.description2}
                colorCode={project.colorCode}
              />
            </pre>
          </p>

          {project.reviewWriter ? (
            <p className="col-12 my-5">
              <h4>{project.reviewWriter}</h4>
              <q>{project.reviewText}</q>
            </p>
          ) : null}

          <p className="d-flex justify-content-evenly justify-content-md-start gap-md-3">
            <a
              target="_blank"
              rel="noreferrer"
              style={{ color: project.colorCode }}
              href={project.href1}
            >
              Source Code
            </a>

            {project.href2 ? (
              <a
                target="_blank"
                rel="noreferrer"
                style={{ color: project.colorCode }}
                href={project.href2}
              >
                Launch Project
              </a>
            ) : null}
          </p>
        </div>
      </section>
    </section>
  );
}

export default Project;
