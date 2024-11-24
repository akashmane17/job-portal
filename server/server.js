import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";

import connetDB from "./config/db.js";
import deserializeUser from "./middlewares/deserializeUser.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

// connect to DB
connetDB();

const port = process.env.PORT || 5000;

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Cookie parser middleware
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(deserializeUser);

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/jobs", jobRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.send("Good!");
});

// Error Handlers
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
