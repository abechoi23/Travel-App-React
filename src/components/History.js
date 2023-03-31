import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import "../css/history.css"

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const HistoryItem = ({ item, deleteItem }) => (
  <Card variant="outlined">
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      </Typography>
      <Typography variant="body2">
        {item.tripResult.map((result, index) => (
          <p key={index}>{result}</p>
        ))}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Date Created: {item.dateCreated.toDate().toString()}
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        size="small"
        startIcon={<DeleteIcon />}
        onClick={() => deleteItem(item.id)}
      >
        Delete
      </Button>
    </CardActions>
  </Card>
);

const History = () => {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "savedTrip"), where("uid", "==", user.uid)),
      (snapshot) => {
        const loadedHistory = [];
        snapshot.forEach((doc) => {
          loadedHistory.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setHistory(loadedHistory);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [db, user.uid]);

  const deleteItem = async (id) => {
    try {
      await deleteDoc(collection(db, "savedTrip", id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      {history.length === 0 ? (
        <Typography>No history available.</Typography>
      ) : (
        <React.Fragment>
          <div className="historyMap">
          {history.map((item) => (
            <HistoryItem
              key={item.id}
              item={item}
              deleteItem={deleteItem}
            />
          ))}</div>
        </React.Fragment>
      )}
    </Box>
  );
};

export default History;
