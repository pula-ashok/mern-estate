import bcryptjs from "bcryptjs";
import User from "./../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      return next(errorHandler(400, "All fields are required"));
    }
    const userfound = await User.findOne({ email: email });

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password || email === "" || password === "") {
      return next(errorHandler(400, "All fields are required"));
    }
    const userfound = await User.findOne({ email });
    if (!userfound) {
      return next(errorHandler(404, "User not found"));
    }
    const passwordMatch = bcryptjs.compareSync(password, userfound.password);
    if (!passwordMatch) {
      return next(errorHandler(404, "Password incorrect"));
    }
    const token = jwt.sign({ id: userfound._id }, process.env.JWT_SECRET);
    const { password: userpassword, ...rest } = userfound._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
