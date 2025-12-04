// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords (in production, hash this)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Simulate token (in real apps, use JWT)
    const token = "dummy-token";

    res.status(200).json({
      user: {
        userId: user._id,
        email: user.email,
        role: user.role || "user"
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
