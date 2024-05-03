import bcryptjs from "bcryptjs";
import User from "./../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const userfound = await User.findOne({ email });
    if (userfound) {
      return next(errorHandler(400, "User already registered"));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Signup successfully" });
  } catch (error) {
    next(error);
  }
};
