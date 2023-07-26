import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../components/firebase";

import Dashboard from "../pages/Dashboard";

function Login() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

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
    <div>
      {!userName ? (
        <div>
          <h1>Please leave this site and go back to the home page!</h1>
          <p>
            This login page is only designed for the owner to maintain the
            dasboard of this website.
          </p>
          <p>
            If your try to login to the dashboard you will recieve an error
            message.
          </p>
          <button onClick={GoogleLogin}>Login with Google</button>
        </div>
      ) : userEmail.includes("szkcsgrg@gmail.com") ? (
        <Dashboard />
      ) : (
        <h1>You are not allowed here!</h1>
      )}
    </div>
  );
}

export default Login;
