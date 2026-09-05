import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/welcomeEmail.js";
import { generateToken } from "../utils/generateJWT.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All Fields are required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email Format" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 charaters" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "Email already exist. Try with another email." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });

      //   todo: send a welcome email to user
      const message =
        "We're excited to have you join Netcom platform! Netcom connects you with friends, family, and colleagues in real-time, no matter where they are.";
      try {
        // Send Email
        await sendEmail({
          name: newUser.fullName,
          email: newUser.email,
          subject: "Welcome to Netcom!",
          message,
          clientUrl: process.env.FRONTEND_URL,
        });
        res.status(200).json({
          success: true,
          message: "Welcome email send to " + newUser.email + " successfully.",
        });
      } catch (error) {
        console.log("Error in Welcome Email:", error);
        res
          .status(500)
          .json({ message: "Internal server error: Welcome Email" });
      }
    } else {
      return res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    console.log("Error in signup controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json({ message: "Invalid Credentials" });

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login Controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (_, res) => {
  res.cookie("jwt", null, {
    maxAge: 0,
  });
  res.status(200).json({ message: "Logged Out Successfully!" });
};
