import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const verifyUser = async (req, res, next) => {
  try {
    // ✅ Check if authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).json({ success: false, message: "Token not provided" });
    }

    const token = req.headers.authorization?.split(" ")[1];

    // ✅ Ensure token exists
    if (!token) {
      return res.status(401).json({ success: false, message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ success: false, message: "Token not valid" });
    }

    // ✅ Correcting the `findById` call
    const user = await User.findById(decoded.id).select("-password");


    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth verification error:", error); // ✅ Log for debugging
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

export default verifyUser;
