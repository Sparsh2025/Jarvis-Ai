const express = require("express");
const authRoute = require("./routing/auth.route");
const chatRoute = require("./routing/chat.route");
const messageRoute = require("./routing/message.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();


const allowedOrigins = [
  "https://jarvis-ai-390d.onrender.com", // frontend
  "http://localhost:5173" // local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, 
  })
);

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);

module.exports = app;
