import React, { useState, useContext } from "react";
import { ChatGptContext } from "../contexts/ChatGptContext";
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { AuthContext } from "../contexts/AuthProvider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { LinearProgress, CircularProgress } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../css/dashboard.css";

const DestinationForm = () => {
  const { generateTripPlan } = useContext(ChatGptContext);
  const { user } = useContext(AuthContext);
  const [destination, setDestination] = useState("");
  const [results, setResults] = useState("");
  const [tripData, setTripData] = useState([]);
  const [days, setDays] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDestinationFormSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const result = await generateTripPlan(destination, days);
      setLoading(false);
      setDestination("");
      setDays("");
      console.log(result);

      const trip = result.data.split("\n");
      setResults(trip);
    } catch (error) {
      console.log(error);
    }
  };

  async function addPost(result) {
    const newPost = {
      tripResult: result,
      dateCreated: Timestamp.now(),
      username: user.displayName,
      uid: user.uid,
    };
    try {
      const docRef = await addDoc(
        collection(getFirestore(), "savedTrip"),
        newPost
      );
      console.log(docRef);
      newPost.id = docRef.id;

      setTripData([...tripData, newPost]);
      setDestination("");
      setDays("");

      return newPost;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <React.Fragment>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {user.loggedIn ? (
          <Box
            component="form"
            onSubmit={handleDestinationFormSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& .MuiTextField-root": { m: 1, width: "50ch" },
              gap: "16px",
              width: "100%",
              maxWidth: "800px",
            }}
          >
            <TextField
              label="Destination"
              variant="outlined"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              sx={{ width: "100%" }}
            />
            <TextField
              label="Days"
              variant="outlined"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              sx={{ width: "100%" }}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ width: "100%" }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Generate Trip Plan"}
            </Button>
          </Box>
        ) : (
          ""
        )}
        {loading && <LinearProgress sx={{ width: "50%", my: 10 }} />}
        {results && (
          <Box sx={{ mt: 3, width: "100%", maxWidth: "800px" }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">View Trip Plan</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ display: "flex", flexDirection: "column" }}
              >
                {results.map((item, index) => (
                  <Typography key={index}>{item}</Typography>
                ))}
                {user.loggedIn && (
                  <Button
                    variant="contained"
                    onClick={() => addPost(results)}
                    sx={{ mt: 2 }}
                  >
                    Save Trip Plan
                  </Button>
                )}
              </AccordionDetails>
            </Accordion>
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
};

export default DestinationForm;
