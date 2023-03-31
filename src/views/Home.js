import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import NavbarPage from "../components/Navbar";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "../css/home.css";

const HomePage = () => {
  const { user, signInWithGoogle } = useContext(AuthContext);

  return (
    <>
      <NavbarPage />
      <div className="container-home">
        <h1>Welcome to the Travel Planner App!</h1>
        {user.loggedIn ? (
          <Navigate to="./Dashboard" />
        ) : (
          <div className="container-home1">
            <p>Please log in to access the travel planner.</p>
            <p>If you don't have an account, please register below.</p>
            <Stack spacing={2} direction="row">
              <Link to="/login">
                <Button className="loginButton" variant="contained">Login</Button>
              </Link>
              <Button variant="contained" onClick={signInWithGoogle}>Login with Google</Button>
              <Link to="/signup">
                <Button variant="contained">Register</Button>
              </Link>
            </Stack>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
