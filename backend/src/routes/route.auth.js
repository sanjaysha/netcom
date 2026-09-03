import express from "express";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send("Hello from Backend - SignUp");
});

router.get("/login", (req, res) => {
  res.send("Login Response");
});

router.get("/logout", (req, res) => {
  res.send("Logout");
});

export default router;
