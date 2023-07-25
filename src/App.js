import React, { useEffect } from "react";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import "./App.css";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/counter/userSlice";

function App() {
  const user = useSelector(selectUser); // Get the user from the Redux store
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        ); // Dispatch the login action with the user data if a user is authenticated
      } else {
        dispatch(logout()); // Dispatch the logout action if no user is authenticated
      }
    });

    return unsubscribe; // Cleanup function to unsubscribe from the auth state change listener
  }, [dispatch]);

  return (
    <div className="app">
      <BrowserRouter>
        {!user ? ( // Render the LoginScreen if no user is authenticated
          <LoginScreen />
        ) : (
          <Routes>
            <Route path="/profile" element={<ProfileScreen />}></Route>
            <Route exact path="/" element={<HomeScreen />} /> 
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
