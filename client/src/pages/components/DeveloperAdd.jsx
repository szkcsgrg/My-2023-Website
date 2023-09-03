import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DeveloperAdd() {
  //Check if there is any User
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(localStorage.user);
  }, []);
  const admin = '"' + process.env.REACT_APP_ADMIN + '"';

  //Add new element to the DB.
  const navigate = useNavigate();
  const [projects, setProjects] = useState({
    name: "",
    dateStart: "",
    stack: "",
    description1: "",
    description2: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    colorCode: "",
    href1: "",
    href2: "",
    developmentType: "",
    position: "",
    dateEnd: "",
  });
  const handleChange = (e) => {
    setProjects((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (
        projects.name === "" ||
        projects.dateStart === "" ||
        projects.dateEnd === "" ||
        projects.stack === "" ||
        projects.image1 === "" ||
        projects.image2 === "" ||
        projects.description1 === "" ||
        projects.description2 === "" ||
        projects.colorCode === "" ||
        projects.href1 === "" ||
        projects.developmentType === "" ||
        projects.position === ""
      ) {
        alert("Please fill all fields");
      } else {
        await axios.post("http://localhost:8800/developerprojects", projects);
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
        <div className="row d-flex flex-column justify-content-center m-0 p-0 m-md-3 p-md-3 m-lg-5 p-lg-5 text-center">
          <h3 className="my-5">Add new project</h3>
          <div className="col-12">
            <form action="post" className="d-flex flex-row gap-3">
              <div className="col-md-6 d-flex flex-column gap-2">
                <input
                  type="text"
                  onChange={handleChange}
                  name="name"
                  placeholder="Title"
                />
                <div>
                  <input type="date" onChange={handleChange} name="dateStart" />{" "}
                  <input type="date" onChange={handleChange} name="dateEnd" />{" "}
                </div>
                <input
                  type="text"
                  onChange={handleChange}
                  name="stack"
                  placeholder="Stack"
                />
                <input
                  type="text"
                  onChange={handleChange}
                  name="developmentType"
                  placeholder="Development Type"
                />
                <input
                  type="text"
                  onChange={handleChange}
                  name="position"
                  placeholder="Position"
                />
                <input
                  type="text"
                  onChange={handleChange}
                  name="colorCode"
                  placeholder="Color Code"
                />
                <input
                  type="href"
                  onChange={handleChange}
                  name="href1"
                  placeholder="Href 1"
                />
                <input
                  type="href"
                  onChange={handleChange}
                  name="href2"
                  placeholder="Href 2"
                />
                <input
                  type="text"
                  onChange={handleChange}
                  name="image1"
                  placeholder="Image 1"
                />
                <input
                  type="text"
                  onChange={handleChange}
                  name="image2"
                  placeholder="Image 2"
                />
                <input
                  type="text"
                  onChange={handleChange}
                  name="image3"
                  placeholder="Image 3"
                />
                <input
                  type="text"
                  onChange={handleChange}
                  name="image4"
                  placeholder="Image 4"
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
                ></textarea>
                <textarea
                  name="description2"
                  onChange={handleChange}
                  id="description2"
                  cols="70"
                  rows="7"
                  placeholder="Description Second"
                ></textarea>
                <button className="col-2" onClick={handleClick}>
                  Save
                </button>
              </div>
            </form>
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

export default DeveloperAdd;
