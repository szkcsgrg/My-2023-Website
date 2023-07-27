import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../components/firebase";

import Dashboard from "../pages/Dashboard";

function Login() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const admin = process.env.REACT_APP_ADMIN;

  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      setUserName(result.user.displayName);
      setUserEmail(result.user.email);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="landing row d-flex justify-content-center flex-column align-items-center">
      {!userName ? (
        <div className="col-8 text-center">
          <h1>Please leave this site!</h1>
          <p>This login page is only designed for the owner of the website.</p>
          <p>
            Trying to login without permission will result trail in the system
            and an error message for you.
          </p>
          <p>
            Are you lost? Navigate back to the <Link to="/">Home</Link> page!
          </p>
          <button onClick={GoogleLogin}>Login with Google</button>
        </div>
      ) : userEmail === admin ? (
        <Dashboard />
      ) : (
        <div className="col-8 text-center">
          <h1>
            You do not have permission to access this part of the application.
          </h1>
          <p>
            Are you lost? Navigate back to the <Link to="/">Home</Link> page!
          </p>
        </div>
      )}
    </section>
  );
}

export default Login;
