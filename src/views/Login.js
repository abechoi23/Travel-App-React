import { useContext } from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import NavbarPage from "../components/Navbar";
import { AuthContext } from "../contexts/AuthProvider";


export default function Login() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <NavbarPage />
      <div className="loginForm">
        <h1>Login</h1>
        <LoginForm />
      </div>
      {user.loggedIn ? <Navigate to="/dashboard" /> : null}
    </>
  );
}
