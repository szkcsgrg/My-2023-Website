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
    reviewWriter: selectedProject.reviewWriter,
    reviewText: selectedProject.reviewText,
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
          `${process.env.REACT_APP_BACKEND_SERVER}/projectsdevelopment/` +
            id
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
          reviewWriter: res.data[0].reviewWriter,
          reviewText: res.data[0].reviewText,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchOneProject();
  }, [id]);

  ////////////////////////////////////////////////////////////////
  //Update the project
  ////////////////////////////////////////////////////////////////

  const formatDateToDDMMYYYY = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the field is a date, format it as "dd.mm.yyyy"
    if (name === "dateStart" || name === "dateEnd") {
      const formattedDate = formatDateToDDMMYYYY(value);
      setUpdatedProject((prev) => ({ ...prev, [name]: formattedDate }));
    } else {
      setUpdatedProject((prev) => ({ ...prev, [name]: value }));
    }
  };

  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();

  const handleImage1 = (e) => {
    const selectedFile = e.target.files[0];
    setImage1(selectedFile);
    setUpdatedProject((prev) => ({
      ...prev,
      image1: URL.createObjectURL(selectedFile),
    }));
  };
  const handleImage2 = (e) => {
    const selectedFile = e.target.files[0];
    setImage2(selectedFile);
    setUpdatedProject((prev) => ({
      ...prev,
      image2: URL.createObjectURL(selectedFile),
    }));
  };
  const handleImage3 = (e) => {
    const selectedFile = e.target.files[0];
    setImage3(selectedFile);
    setUpdatedProject((prev) => ({
      ...prev,
      image3: URL.createObjectURL(selectedFile),
    }));
  };
  const handleImage4 = (e) => {
    const selectedFile = e.target.files[0];
    setImage4(selectedFile);
    setUpdatedProject((prev) => ({
      ...prev,
      image4: URL.createObjectURL(selectedFile),
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", updatedProject.name);
      formData.append("dateStart", updatedProject.dateStart);
      formData.append("stack", updatedProject.stack);
      formData.append("description1", updatedProject.description1);
      formData.append("description2", updatedProject.description2);
      formData.append("colorCode", updatedProject.colorCode);
      formData.append("href1", updatedProject.href1);
      formData.append("href2", updatedProject.href2);
      formData.append("developmentType", updatedProject.developmentType);
      formData.append("position", updatedProject.position);
      formData.append("dateEnd", updatedProject.dateEnd);
      formData.append("reviewWriter", updatedProject.reviewWriter);
      formData.append("reviewText", updatedProject.reviewText);
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);
      await axios.put(
        `${process.env.REACT_APP_BACKEND_SERVER}/updateDeveloperProject/` +
          id,
        formData
      );
      navigate("/login");
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
          <div className="d-flex flex-column justify-content-center m-0 p-0 m-md-3 p-md-3 m-lg-5 p-lg-5 text-center">
            <h3 className="my-5">Edit exsisting project</h3>

            <form action="post" className="row" key={selectedProject.id}>
              <div className="col-10 col-lg-6 d-flex flex-column gap-2">
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
                  type="file"
                  accept="image/*"
                  onChange={handleImage1}
                  name="image1"
                  placeholder="Image 1"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage2}
                  name="image2"
                  placeholder="Image 2"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage3}
                  name="image3"
                  placeholder="Image 3"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage4}
                  name="image4"
                  placeholder="Image 4"
                />
              </div>
              <div className="col-10 col-lg-6">
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
              </div>
              <div className="col-10 col-lg-12 d-flex flex-column align-items-center my-5">
                <div className="col-6 d-flex flex-column">
                  <input
                    type="text"
                    onChange={handleChange}
                    name="reviewWriter"
                    placeholder="Review Writer"
                    defaultValue={selectedProject.reviewWriter}
                  />
                  <textarea
                    name="reviewText"
                    cols="35"
                    rows="7"
                    placeholder="Review Text"
                    onChange={handleChange}
                    defaultValue={selectedProject.reviewText}
                  ></textarea>
                </div>
                <button className="col-2 my-4" onClick={handleClick}>
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

export default DeveloperEdit;
