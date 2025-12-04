// routes/reviews.js
const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// Add a new review
router.post("/:productId/reviews", async (req, res) => {
  try {
    const { productId } = req.params;
    const { userName, userReview, rating } = req.body;

    if (!userName || !userReview || !rating) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newReview = new Review({
      productId,
      userName,
      userReview,
      rating,
    });

    await newReview.save();
    const reviews = await Review.find({ productId }).sort({ timestamp: -1 });
    res.status(201).json({ message: "Review added successfully!", reviews });
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});


// Get reviews for a specific product
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId }).sort({ timestamp: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
