import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export async function authUser(req, res, next) {

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
      err: "No token provided",
    });
  }

  // console.log("Cookies:", req.cookies);
  // console.log("Token:", req.cookies.token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log("DECODED:", decoded);

    const user = await userModel.findById(decoded.userId);

    // console.log("USER:", user);

    req.user = user;

    next();

  } catch (err) {

      // console.log("AUTH ERROR:", err);

      return res.status(401).json({
          message: "Unauthorized",
          success: false,
          err: "Invalid token"
      });
  }
  
}


export default authUser;