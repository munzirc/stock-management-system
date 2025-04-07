import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const login = async (req, res) => {

    try {
        const {username, password} = req.body;
        // const user = new User({username, password});
        // await user.save();

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

          const token = jwt.sign({ id: user._id, username: user.username  }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
        
          res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "prod",
            sameSite: "Strict",
            // maxAge: 5 * 1000,
            maxAge: 24 * 60 * 60 * 1000,
          });
        
          res.status(200).json({ message: "Login successful" });

    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
} 


const logout = (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "prod",
    });
    res.status(200).json({ message: "Logged out successfully", severity: 'success' });
  };
  

export default {
    login,
    logout
}