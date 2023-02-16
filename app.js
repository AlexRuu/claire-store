require("dotenv").config();
require("express-async-errors");

// Express
const express = require("express");
const app = express();

// Database
const connectDB = require("./db/connect");

// Routers
const authRouter = require("./routes/authRoute");

// Middlewares

// Routes.use
app.use("/api/auth", authRouter);

// Port
const port = process.env.PORT || 3000;

// Start Server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log("Server is running..."));
  } catch (error) {
    console.log(error);
  }
};

start();
