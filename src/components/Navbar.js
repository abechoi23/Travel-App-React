import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "../css/navbar.css";

const NavbarPage = () => {
  const { user, login, logout } = useContext(AuthContext);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Travel Planner
            </Typography>
            {user && user.loggedIn && (
              <>
                <Link to="/dashboard">
                  <Button
                    sx={{ color: "white", textDecoration: "none" }}
                    color="inherit"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Link to="/savedtrips">
                  <Button
                    sx={{ color: "white", textDecoration: "none" }}
                    color="inherit"
                  >
                    Saved Trips
                  </Button>
                </Link>
              </>
            )}
            {user.loggedIn ? (
              <>
                <Button
                  onClick={logout}
                  sx={{ color: "white", textDecoration: "none" }}
                  color="inherit"
                >
                  Logout
                </Button>
                <Typography variant="body1" component="div">
                  Current User: {user.displayName}
                </Typography>
              </>
            ) : (
              <>
                <Link to="/">
                  <Button
                    sx={{ color: "white", textDecoration: "none" }}
                    color="inherit"
                  >
                    Home
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    sx={{ color: "white", textDecoration: "none" }}
                    color="inherit"
                  >
                    Register
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    sx={{ color: "white", textDecoration: "none" }}
                    color="inherit"
                    onClick={login}
                  >
                    Login
                  </Button>
                </Link>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavbarPage;
