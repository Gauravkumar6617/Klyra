import express from "express";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";

const app = express();

// Enable JSON parsing
app.use(express.json());

// Enable CORS for your frontend
app.use(
  cors({
    origin: "http://localhost:3000", // replace with your frontend URL
    credentials: true,               // allow cookies or auth headers
  })
);

// Routes
app.use("/api/auth", AuthRoutes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

export default app;
