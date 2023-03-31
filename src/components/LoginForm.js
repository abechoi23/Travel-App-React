import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import "../css/login.css";

function LoginForm() {
  const { login, signInWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    login(email, password);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
    >
      <TextField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        variant="outlined"
        required
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        variant="outlined"
        required
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ marginTop: "16px" }}
          >
            Log in
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            onClick={signInWithGoogle}
            fullWidth
            sx={{ marginTop: "16px" }}
          >
            Sign in with Google
          </Button>
          
        </Grid>

      </Grid>
      <p>
      Don't have an account? <Link to="/signup">Sign Up Here</Link>.
        </p>
    </Box>
  );
}

export default LoginForm;
