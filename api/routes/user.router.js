import express from "express";
import { testapi } from "../controllers/user.controller.js";

const userRouter = express.Router();
userRouter.get("/test", testapi);

export default userRouter;
