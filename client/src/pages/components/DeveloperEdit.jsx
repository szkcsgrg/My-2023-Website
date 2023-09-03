import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DeveloperEdit() {
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(localStorage.user);
  }, []);

  const admin = '"' + process.env.REACT_APP_ADMIN + '"';
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
          <h1>This is the edit page {user}</h1>
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
