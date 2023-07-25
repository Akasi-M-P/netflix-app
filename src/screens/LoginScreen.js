import React from "react";
import "./LoginScreen.css";
import { useState } from "react";
import SignupScreen from "./SignupScreen";

const LoginScreen = () => {
  const [signIn, setSignIn] = useState(false); // State to track if the user is signing in or not

  return (
    <div className="loginScreen">
      {/* Login screen background */}
      <div className="loginScreen_background">
        <img
          className="loginScreen_logo"
          src="https://cdn.icon-icons.com/icons2/2699/PNG/512/netflix_official_logo_icon_168085.png"
          alt=""
        />
        <button onClick={() => setSignIn(true)} className="loginScreen_button">
          Sign In
        </button>

        <div className="loginScreen_gradient" />
      </div>

      {/* Login screen body */}
      <div className="loginScreen_body">
        {signIn ? (
          <SignupScreen /> // Render the SignupScreen component if signIn is true
        ) : (
          <>
            <h1>Unlimited movies, TV shows, and more</h1>
            <h2>Plans now start at US$2.99/month.</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>

            <div className="loginScreen_input">
              <form>
                <input type="email" placeholder="Email Address" />
                <button
                  onClick={() => setSignIn(true)}
                  className="loginScreen_getStarted"
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
