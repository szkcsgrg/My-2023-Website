import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function DeveloperEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const admin = '"' + process.env.REACT_APP_ADMIN + '"';
  const [selectedProject, setSelectedProject] = useState([]);
  const [updatedProject, setUpdatedProject] = useState({
    name: selectedProject.name,
    dateStart: selectedProject.dateStart,
    stack: selectedProject.stack,
    description1: selectedProject.description1,
    description2: selectedProject.description2,
    image1: selectedProject.image1,
    image2: selectedProject.image2,
    image3: selectedProject.image3,
    image4: selectedProject.image4,
    colorCode: selectedProject.colorCode,
    href1: selectedProject.href1,
    href2: selectedProject.href2,
    developmentType: selectedProject.developmentType,
    position: selectedProject.position,
    dateEnd: selectedProject.dateEnd,
  });

  const [user, setUser] = useState();
  useEffect(() => {
    setUser(localStorage.user);
  }, []);

  //Get one project by id from the backend.
  useEffect(() => {
    const fetchOneProject = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/projectsdevelopment/" + id
        );
        setSelectedProject(res.data[0]);
        setUpdatedProject({
          name: res.data[0].name,
          dateStart: res.data[0].dateStart,
          stack: res.data[0].stack,
          description1: res.data[0].description1,
          description2: res.data[0].description2,
          image1: res.data[0].image1,
          image2: res.data[0].image2,
          image3: res.data[0].image3,
          image4: res.data[0].image4,
          colorCode: res.data[0].colorCode,
          href1: res.data[0].href1,
          href2: res.data[0].href2,
          developmentType: res.data[0].developmentType,
          position: res.data[0].position,
          dateEnd: res.data[0].dateEnd,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchOneProject();
  }, []);

  ////////////////////////////////////////////////////////////////
  //Update the project
  ////////////////////////////////////////////////////////////////

  const handleChange = (e) => {
    setUpdatedProject({ ...updatedProject, [e.target.name]: e.target.value });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (
        updatedProject.name === "" ||
        updatedProject.dateStart === "" ||
        updatedProject.dateEnd === "" ||
        updatedProject.stack === "" ||
        updatedProject.image1 === "" ||
        updatedProject.image2 === "" ||
        updatedProject.description1 === "" ||
        updatedProject.description2 === "" ||
        updatedProject.colorCode === "" ||
        updatedProject.href1 === "" ||
        updatedProject.developmentType === "" ||
        updatedProject.position === ""
      ) {
        alert("Please fill all fields");
      } else {
        await axios.put(
          "http://localhost:8800/updateDeveloperProject/" + id,
          updatedProject
        );
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!user ? (
        <div className="landing row d-flex justify-content-center flex-column align-items-center m-0 p-0 m-md-3 p-md-3 m-lg-5 p-lg-5">
          <div className="col-8 text-center">
            <h1>Please leave this site!</h1>
            <p>This page is only designed for the owner of the website.</p>
            <p>
              Are you lost? Navigate back to the <Link to="/">Home</Link> page!
            </p>
          </div>
        </div>
      ) : user === admin ? (
        <div className="section d-flex justify-content-center flex-column col-12">
          <div className="row d-flex flex-column justify-content-center m-0 p-0 m-md-3 p-md-3 m-lg-5 p-lg-5 text-center">
            <h3 className="my-5">Edit exsisting project</h3>
            <div className="col-12">
              <form
                action="post"
                className="d-flex flex-row gap-3"
                key={selectedProject.id}
              >
                <div className="col-md-6 d-flex flex-column gap-2">
                  <input
                    type="text"
                    onChange={handleChange}
                    name="name"
                    placeholder="Title"
                    defaultValue={selectedProject.name}
                  />
                  <div>
                    <input
                      type="date"
                      onChange={handleChange}
                      name="dateStart"
                      defaultValue={selectedProject.dateStart}
                    />{" "}
                    <input
                      type="date"
                      onChange={handleChange}
                      name="dateEnd"
                      defaultValue={selectedProject.dateEnd}
                    />{" "}
                  </div>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="stack"
                    placeholder="Stack"
                    defaultValue={selectedProject.stack}
                  />
                  <input
                    type="text"
                    onChange={handleChange}
                    name="developmentType"
                    placeholder="Development Type"
                    defaultValue={selectedProject.developmentType}
                  />
                  <input
                    type="text"
                    onChange={handleChange}
                    name="position"
                    placeholder="Position"
                    defaultValue={selectedProject.position}
                  />
                  <input
                    type="text"
                    onChange={handleChange}
                    name="colorCode"
                    placeholder="Color Code"
                    defaultValue={selectedProject.colorCode}
                  />
                  <input
                    type="href"
                    onChange={handleChange}
                    name="href1"
                    placeholder="Href 1"
                    defaultValue={selectedProject.href1}
                  />
                  <input
                    type="href"
                    onChange={handleChange}
                    name="href2"
                    placeholder="Href 2"
                    defaultValue={selectedProject.href2}
                  />
                  <input
                    type="text"
                    onChange={handleChange}
                    name="image1"
                    placeholder="Image 1"
                    defaultValue={selectedProject.image1}
                  />
                  <input
                    type="text"
                    onChange={handleChange}
                    name="image2"
                    placeholder="Image 2"
                    defaultValue={selectedProject.image2}
                  />
                  <input
                    type="text"
                    onChange={handleChange}
                    name="image3"
                    placeholder="Image 3"
                    defaultValue={selectedProject.image3}
                  />
                  <input
                    type="text"
                    onChange={handleChange}
                    name="image4"
                    placeholder="Image 4"
                    defaultValue={selectedProject.image4}
                  />
                </div>
                <div className="col-md-6">
                  <textarea
                    name="description1"
                    onChange={handleChange}
                    id="description1"
                    cols="70"
                    rows="7"
                    placeholder="Description First"
                    defaultValue={selectedProject.description1}
                  ></textarea>
                  <textarea
                    name="description2"
                    onChange={handleChange}
                    id="description2"
                    cols="70"
                    rows="7"
                    placeholder="Description Second"
                    defaultValue={selectedProject.description2}
                  ></textarea>
                  <button className="col-2" onClick={handleClick}>
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="landing row d-flex justify-content-center flex-column align-items-center m-0 p-0 m-md-3 p-md-3 m-lg-5 p-lg-5">
          <div className="col-8 text-center">
            <h1>
              You do not have permission to access this part of the application.
            </h1>
            <p>
              Navigate back to the <Link to="/">Home</Link> page!
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default DeveloperEdit;
