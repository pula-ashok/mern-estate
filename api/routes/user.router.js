import express from "express";
import { testapi, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const userRouter = express.Router();
userRouter.get("/test", testapi);
userRouter.put("/update/:id", verifyToken, updateUser);

export default userRouter;
