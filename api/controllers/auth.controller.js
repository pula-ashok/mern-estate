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

export const google = async (req, res, next) => {
  const { username, email, photo } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET);
      const { password, ...rest } = userFound._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassowrd = bcryptjs.hashSync(randomPassword, 10);
      const usernameUpdated =
        username.split(" ").join("") + Math.round(Math.random() * 10000);
      const newUser = new User({
        username: usernameUpdated,
        email,
        password: hashedPassowrd,
        photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(201)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "signout successfully" });
  } catch (error) {
    next(error);
  }
};
