import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config({
  path: "./.env",
});

import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";

//allowing json to be sent in the body of the request
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_SIDE_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/posts", postRoute);

connectDB()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
