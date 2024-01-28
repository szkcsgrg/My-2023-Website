import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PhotoAdd() {
  const backendServer = process.env.REACT_APP_BACKEND_SERVER;
  //`${backendServer}

  //Check if there is any User
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(localStorage.user);
  }, []);
  const admin = '"' + process.env.REACT_APP_ADMIN + '"';

  //Add new element to the DB.
  const navigate = useNavigate();
  const [photo, setPhoto] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPhoto((prev) => ({ ...prev, [name]: value }));
  };

  const [image, setImage] = useState();
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    // const selectedFile = e.target.files[0];
    // setImage(selectedFile);
    // setPhoto((prev) => ({
    //   ...prev,
    //   image: URL.createObjectURL(selectedFile),
    // }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", photo.name);
      formData.append("topic", photo.topic);
      formData.append("image", image);
      console.log(image);
      console.log(formData);
      const response = await axios.post(
        `${backendServer}:8800/addPhoto`,
        formData
      );
      if (response.status === 200) {
        console.log("Photo has been successfully uploaded.");
        navigate("/login");
      } else {
        console.error("Pohoto upload failed.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
      } else {
        console.log("Error: ", error);
      }
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
        <div className="d-flex flex-column justify-content-center m-0 p-0 m-md-3 p-md-3 m-lg-5 p-lg-5 text-center">
          <h3 className="my-5">Upload New Photo</h3>
          <div className="col-12 d-flex flex-row justify-content-center text-center">
            <form
              action="post"
              className="d-flex flex-column col-6 justify-content-center text-center gap-2"
            >
              <input
                type="text"
                onChange={handleChange}
                name="name"
                placeholder="Title"
              />
              <input
                type="text"
                onChange={handleChange}
                name="topic"
                placeholder="portraits, weddings, products, lifestyle"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                name="image"
                placeholder="Image"
              />
              <button
                className="col-2 my-2 justify-content-center"
                onClick={handleClick}
              >
                Save
              </button>
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

export default PhotoAdd;
