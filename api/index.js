import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import createConnection from "./db/createConnection.js";
import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth.router.js";
import listingRouter from "./routes/listing.router.js";
import path from "path";

const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());

const __dirname = path.resolve();

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);

// app.get("/test", (req, res) => {
//   res.json({ message: "test api route is working" });
// });
app.listen(3000, () => {
  console.log("server is running at 3000");
  createConnection();
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,

    message,
  });
});

app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
