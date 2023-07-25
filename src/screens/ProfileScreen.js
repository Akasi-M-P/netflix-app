import { useSelector } from "react-redux";
import Nav from "../Nav";
import "./ProfileScreen.css";
import PlansScreen from "./PlansScreen";
import { selectUser } from "../features/counter/userSlice";
import { auth } from "../firebase";

const ProfileScreen = () => {
  const user = useSelector(selectUser); // Get the user from the Redux store

  return (
    <div className="profileScreen">
      <Nav /> {/* Render the Nav component */}
      <div className="profileScreen_body">
        <h1>Edit Profile</h1>
        <div className="profileScreen_info">
          <img
            src="https://cdn.icon-icons.com/icons2/1146/PNG/512/1486485581-account-audience-person-customer-profile-user_81164.png"
            alt=""
          /> {/* User profile image */}
          <div className="profileScreen_details">
            <h2>{user.email}</h2> {/* Display the user's email */}
            <div className="profileScreen_plans">
              <h3>Plans (Current Plan: premium)</h3>

              <PlansScreen /> {/* Render the PlansScreen component */}
              <button
                onClick={() => auth.signOut()} // Call the signOut function from Firebase auth when the button is clicked
                className="profileScreen_signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
