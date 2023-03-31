import SignupForm from "../components/SignupForm";
import NavbarPage from "../components/Navbar";

export default function Signup() {
  return (
    <>
    <NavbarPage />
    <div className="signupForm">
      <h1>Register</h1>
      <SignupForm />
    </div>
    </>
  );
}
