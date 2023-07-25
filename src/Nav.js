import { useState, useEffect } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();

  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <div className="nav_contents">
        <img
          onClick={() => navigate("/")}
          className="nav_logo"
          src="https://cdn.icon-icons.com/icons2/2699/PNG/512/netflix_official_logo_icon_168085.png"
          alt=""
        />

        <img
          className="nav_avatar"
          src="https://cdn.icon-icons.com/icons2/1146/PNG/512/1486485581-account-audience-person-customer-profile-user_81164.png"
          alt="avatar"
          onClick={() => navigate("/profile")}
        />
      </div>
    </div>
  );
};
export default Nav;
