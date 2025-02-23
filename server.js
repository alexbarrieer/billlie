import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { openaiRequest } from "./services/openaiRequest.js";
import config from "./config/config.json" with { type: "json" };
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 4001;

// Simple CORS configuration that allows all local origins
app.use(cors());  // This will allow all origins
app.use(bodyParser.json());

// Setting Request Rate Limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  message: "Too many requests from this IP, please try again later.",
});

app.use("/chat", limiter);

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    console.log("messages", messages);

    if (!Array.isArray(messages)) {
      return res.status(400).json({ 
        error: "Messages must be an array" 
      });
    }

    // Converting messages to OpenAI API format
    const chatHistory = messages.map((msg, index) => ({
      role: index % 2 === 0 ? "user" : "assistant",
      content: msg
    }));

    // Limit the history to the last 10 messages
    const trimmedHistory = chatHistory.slice(-10);

    const botReply = await openaiRequest(trimmedHistory);

    res.json({ reply: botReply });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({
      error: "Error sending request: " + error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
