const express = require("express");
const router = express.Router();
const CartItem = require("../models/CartItem");
const authenticateUser = require("../middleware/authmiddleware");

// Get all items for a specific user
router.get("/:userId", authenticateUser, async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const items = await CartItem.find({ userId }).populate("productId");
    const itemsWithProduct = items.map(item => ({
      ...item.toObject(),
      product: item.productId,
    }));
    res.json(itemsWithProduct);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Failed to fetch cart items" });
  }
});

// Add a new item to the cart
router.post("/add", authenticateUser, async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const existingItem = await CartItem.findOne({ userId, productId });
    if (existingItem) {
      return res.status(400).json({ message: "Item already exists in the cart" });
    }
    const item = new CartItem({ userId, productId, quantity });
    await item.save();
    res.json(item);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Failed to add item to cart" });
  }
});

// Update quantity of a cart item
router.patch("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  try {
    const updatedItem = await CartItem.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    ).populate("productId");

    if (!updatedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    const itemWithProduct = {
      ...updatedItem.toObject(),
      product: updatedItem.productId,
    };

    res.json(itemWithProduct);
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    res.status(500).json({ message: "Failed to update item quantity" });
  }
});

// Delete a cart item
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ message: "Failed to delete cart item" });
  }
});

module.exports = router;
