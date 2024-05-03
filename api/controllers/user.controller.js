import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const testapi = (req, res) => {
  res.json({ message: "test api route is working fine" });
};

export const updateUser = async (req, res, next) => {
  const { username, email, password, photo } = req.body;
  try {
    const userId = req.user.id;
    const paramsId = req.params.id;
    if (userId !== paramsId) {
      return next(errorHandler(400, "You can only update your profile"));
    }
    let hashedPassword;
    if (password) {
      hashedPassword = bcryptjs.hashSync(password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: { username, email, password: hashedPassword, photo },
      },
      { new: true }
    );
    const { password: pass, ...rest } = updatedUser._doc;
    return res.status(201).json(rest);
  } catch (error) {
    next(error);
  }
};
