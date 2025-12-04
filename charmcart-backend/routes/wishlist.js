const express = require("express");
const router = express.Router();
const WishlistItem = require("../models/WishlistItem");
const authenticateUser = require("../middleware/authmiddleware"); // Import the middleware

// Get wishlist items for a user

router.get("/:userId", authenticateUser, async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const items = await WishlistItem.find({ userId }).populate("productId");
    // Rename productId to product for frontend convenience
    const itemsWithProduct = items.map(item => ({
      ...item.toObject(),
      product: item.productId,
    }));
    res.json(itemsWithProduct);
  } catch (error) {
    console.error("Error fetching Wishlist items:", error);
    res.status(500).json({ message: "Failed to fetch Wishlist items" });
  }
});


// Add an item to the wishlist
router.post("/add", authenticateUser, async (req, res) => {
  const { userId, productId } = req.body;
    const existingItem = await WishlistItem.findOne({ userId, productId });
    if (existingItem) {
      return res.status(400).json({ message: "Item already exists in the wishlist" });
    }

    const item = new WishlistItem({ userId, productId });
    await item.save();
    res.json(item);
});

// Remove an item from the wishlist
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    await WishlistItem.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item from wishlist" });
  }
});

module.exports = router;