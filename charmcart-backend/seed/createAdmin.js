const mongoose = require("mongoose");
const User = require("../models/User");

mongoose.connect("mongodb://localhost:27017/charmcart", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: "admin@charmcart.com" });
    if (existingAdmin) {
      console.log("Admin already exists.");
      process.exit();
    }

    const admin = new User({
      email: "admin@charmcart.com",
      password: "admin123", // In production, hash this
      role: "admin",
    });

    await admin.save();
    console.log("✅ Admin user created successfully");
    process.exit();
  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
};

createAdmin();
