import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorHandler(401, "Unauthorized token not found"));
  jwt.verify(token, process.env.JWT_SECREt, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized token is not matching"));
    }
    req.user = user;
    // console.log(req.user);
    next();
  });
};
