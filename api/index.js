import express from "express";
import dotenv from "dotenv";
import createConnection from "./db/createConnection.js";
import userRouter from "./routes/user.router.js";

const app = express();
dotenv.config();

app.use("/api/user", userRouter);

// app.get("/test", (req, res) => {
//   res.json({ message: "test api route is working" });
// });
app.listen(3000, () => {
  console.log("server is running at 3000");
  createConnection();
});
