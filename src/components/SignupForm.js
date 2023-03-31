import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../css/signup.css";

const SignupForm = () => {
  const { login } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const db = getFirestore();
      const userRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userRef, {
        firstName: firstName,
        lastName: lastName,
        email: userCredential.user.email,
      });
      login(userCredential);
    } catch (error) {
      console.error(error);
    }
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return (
    <Box
      component="form"
      className="signup-form-container"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <form onSubmit={handleSignup}>
        <TextField
          id="outlined-first-name"
          label="First Name"
          type="firstName"
          autoComplete="current-firstName"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          required
        />
        <TextField
          id="outlined-last-name"
          label="Last Name"
          type="lastName"
          autoComplete="current-lastName"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          required
        />
        <TextField
          id="outlined-email"
          label="Email Address"
          type="email"
          autoComplete="current-email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <TextField
          helperText="Minimum of 8 characters, 1 number, 1 uppercase, 1 lowercase, and 1 special character"
          id="outlined-password"
          label="password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <TextField
          id="outlined-confirm-password"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          required
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 2 }}
          disabled={
            !(
              firstName &&
              lastName &&
              email &&
              passwordRegex.test(password) &&
              password === confirmPassword
            )
          }
        >
          Sign up
        </Button>
        <p>
          Already have an account? <Link to="/login">Log in here</Link>.
        </p>
      </form>
    </Box>
  );
};

export default SignupForm;
