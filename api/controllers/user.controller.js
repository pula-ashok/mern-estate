import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import Listing from "./../models/listing.model.js";

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
export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const paramsId = req.params.id;
    if (userId !== paramsId) {
      return next(errorHandler(400, "You can only delete your profile"));
    }
    await User.findByIdAndDelete(userId);
    res.clearCookie("access_token");
    res.status(201).json({ messsage: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({ userRef: req.params.id });
    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
