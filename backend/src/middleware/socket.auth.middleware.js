import jwt from "jsonwebtoken";
import User from "../models/Users.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    // Extract token from http-only cookie
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];
    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized - Invalid Token"));
    }

    //Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      console.log("Socket connection rejected: Invalid Token");
      return next(new Error("Unauthorized - Invalid Token"));
    }

    //Find the user from DB
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("Socket connection rejected: User Not Found");
      return next(new Error("User Not Found"));
    }

    //Attach userinfo to socket
    socket.user = user;
    socket.userId = user._id.toString();

    console.log(`Socket Authenticated for user: ${user.fullName}(${user._id})`);
    next();
  } catch (error) {
    console.log("Error in socket authentication: error.message");
    return next(new Error("Unauthorized - Authentication Failed"));
  }
};
