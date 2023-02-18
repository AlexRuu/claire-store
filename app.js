require("dotenv").config();
require("express-async-errors");

// Express
const express = require("express");
const app = express();

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

// Database
const connectDB = require("./db/connect");

// Routers
const authRouter = require("./routes/authRoute");

// Middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

morgan("tiny");
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static("./public"));
app.use(fileUpload());

// Routes.use
app.use("/api/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
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
