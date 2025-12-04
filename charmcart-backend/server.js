const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Signup Route
app.post("/signup", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error. Please try again later.", error: error.message });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password, loginType } = req.body;
  console.log("Login Request Received:", { email, loginType });

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    if (loginType === "admin") {
      const staticAdminEmail = "admin@gmail.com";
      const staticAdminPassword = "admin123";

      if (email === staticAdminEmail && password === staticAdminPassword) {
        console.log("Admin login successful");
        return res.status(200).json({
          message: "Admin login successful",
          user: { name: "Admin", email: staticAdminEmail, role: "admin" },
        });
      } else {
        console.log("Invalid admin credentials");
        return res.status(401).json({ message: "Invalid admin credentials." });
      }
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "User not found. Please sign up." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials." });
    }

    console.log("User login successful");
    return res.status(200).json({
      message: "Login successful",
      user: { name: user.name, email: user.email, role: "user" },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
});

// DB connection
const connectDB = require("./config/db");
connectDB();

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/wishlist", require("./routes/wishlist"));
app.use("/api/orders", require("./routes/order"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/reviews"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



