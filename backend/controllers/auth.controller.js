import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err = new Error("Invalid credentials");
      err.status = 401;
      throw err;
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "prod",
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None",
    secure: process.env.NODE_ENV === "prod",
  });
  res
    .status(200)
    .json({ message: "Logged out successfully", severity: "success" });
};

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user != null || user != undefined) {
      return res.status(409).json({ message: "User already exists" });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      return res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

export default {
  login,
  logout,
  createUser,
};
