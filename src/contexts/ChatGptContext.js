import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { db } from "../firebase";
import { OpenAIApi, Configuration } from "openai";

export const ChatGptContext = createContext();

export const ChatGptProvider = (props) => {
  const [tripPlan, setTripPlan] = useState("");
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const generateTripPlan = async (destination, days) => {
    const prompt = `I am traveling to ${destination} for ${days} day. Plan a trip out for me.`;
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + process.env.REACT_APP_OPENAI_API_KEY,
          },
        }
      );
      console.log(response);
      const tripPlan = response.data.choices[0].message.content;
      setTripPlan(tripPlan);
      return {
        data: tripPlan,
      };
    } catch (error) {
      console.error(error);
    }
  };

  const saveToFirebase = async (destination, days, tripPlan) => {
    db.collection("trips")
      .add({
        destination: destination,
        days: days,
        plan: tripPlan,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const value = {
    tripPlan,
    generateTripPlan,
  };

  return (
    <ChatGptContext.Provider value={value}>
      {props.children}
    </ChatGptContext.Provider>
  );
};
