import express from "express";
import {
  deleteUser,
  getUser,
  getUserListings,
  testapi,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const userRouter = express.Router();
userRouter.get("/test", testapi);
userRouter.put("/update/:id", verifyToken, updateUser);
userRouter.delete("/delete/:id", verifyToken, deleteUser);
userRouter.get("/listings/:id", verifyToken, getUserListings);
userRouter.get("/get/:id", verifyToken, getUser);

export default userRouter;
