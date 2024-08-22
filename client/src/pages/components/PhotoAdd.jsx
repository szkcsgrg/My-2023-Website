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
  const [clickable, setClickable] = useState(false);
  const [photoTitle, setPhotoTitle] = useState();
  const [photoTopic, setTopic] = useState();
  const [photoDate, setDate] = useState();
  const [cover1, setCover1] = useState();
  const [cover2, setCover2] = useState();
  const [cover3, setCover3] = useState();
  const [image4, setImage4] = useState();
  const [image5, setImage5] = useState();
  const [image6, setImage6] = useState();
  const [image7, setImage7] = useState();
  const [image8, setImage8] = useState();
  const [image9, setImage9] = useState();

  const handleClickable = (e) => {
    const { clickable } = e.target;
    setClickable(clickable === false ? true : false);
  };
  const handleTitleChange = (e) => {
    setPhotoTitle(e.target.value);
  };
  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

    

    const handleCover1 = (e) => {
        setCover1(e.target.files[0]);
    };
    const handleCover2 = (e) => {
        setCover2(e.target.files[0]);
    };
    const handleCover3 = (e) => {
        setCover3(e.target.files[0]);
    };
    const handleImage4 = (e) => {
        setImage4(e.target.files[0]);
    };
    const handleImage5 = (e) => {
        setImage5(e.target.files[0]);
    };
    const handleImage6 = (e) => {
        setImage6(e.target.files[0]);
    };
    const handleImage7 = (e) => {
        setImage7(e.target.files[0]);
    };
    const handleImage8 = (e) => {
        setImage8(e.target.files[0]);
    };
    const handleImage9 = (e) => {
        setImage9(e.target.files[0]);
    };




  const handleClick = async (e) => {
    e.preventDefault();
    if(!photoTopic){
      alert("Please select a topic.");
    }else{
      try {
        console.log("/////////////////////////////////////////")
        console.log(photoTitle)
        console.log(photoTopic)
        console.log(cover1)
        console.log(cover2)
        console.log(cover3)
        console.log(image4)
        console.log(image5)
        console.log(image6)
        console.log(image7)
        console.log(image8)
        console.log(image9)
        console.log(clickable)
        console.log(photoDate);
        console.log("/////////////////////////////////////////")

        const formData = new FormData();
        formData.append("name", photoTitle);
        formData.append("topic", photoTopic);
        formData.append("cover1", cover1);
        formData.append("cover2", cover2);
        formData.append("cover3", cover3);
        formData.append("image4", image4);
        formData.append("image5", image5);
        formData.append("image6", image6);
        formData.append("image7", image7);
        formData.append("image8", image8);
        formData.append("image9", image9);
        formData.append("clickable", clickable);
        formData.append("date", photoDate);
        console.log(formData);
        

        const response = await axios.post(
          `${backendServer}/addPhoto`,
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
              <input type="checkbox" name="clickable" id="" default="false" onChange={handleClickable} />
              <input
                type="text"
                onChange={handleTitleChange}
                name="name"
                placeholder="Title"
              />
              <input type="text"
                onChange={handleDateChange}
                name="date"
                placeholder="12.03.2003"
              />
              <select name="topic" id="" onChange={handleTopicChange}>
                <option default>Change</option>
                <option value="portraits">Portraits</option>
                <option value="weddings">Weddings</option>
                <option value="products">Products</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
              <div>
                <label htmlFor="cover1" className="mx-2">Cover 1.:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleCover1}
                    name="cover1"
                    placeholder="Image"
                    />
              </div>
              <div>
                <label htmlFor="cover2" className="mx-2">Cover 2.:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleCover2}
                    name="cover2"
                    placeholder="Image"
                    />
              </div>
              <div>
                <label htmlFor="cover3" className="mx-2">Cover 3.:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleCover3}
                    name="cover3"
                    placeholder="Image"
                    />
              </div>
              <div>
                <label htmlFor="image4" className="mx-2">Image 4.:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage4}
                    name="image3"
                    placeholder="Image"
                    />
              </div>
              <div>
                <label htmlFor="image5" className="mx-2">Image 5.:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage5}
                    name="image5"
                    placeholder="Image"
                    />
              </div>
              <div>
                <label htmlFor="image6" className="mx-2">Image 6.:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage6}
                    name="image6"
                    placeholder="Image"
                    />
              </div>
              <div>
                <label htmlFor="image7" className="mx-2">Image 7.:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage7}
                    name="image7"
                    placeholder="Image"
                    />
              </div>
              <div>
                <label htmlFor="image8" className="mx-2">Image 8.:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage8}
                    name="image8"
                    placeholder="Image"
                    />
              </div>
              <div>
                <label htmlFor="image9" className="mx-2">Image 9.:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage9}
                    name="image9"
                    placeholder="Image"
                    />
              </div>
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
