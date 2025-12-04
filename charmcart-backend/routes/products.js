const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const { category, occasions, searchTerm } = req.query;
    const filters = {};

    if (category) filters.category = category;

    if (occasions) filters.occasions = { $in: [occasions] };

    if (searchTerm) {
      // Use regex for case-insensitive partial match
      filters.name = { $regex: searchTerm, $options: "i" };
    }

    const products = await Product.find(filters);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {A
    return res.status(400).json({ message: "Invalid product ID" });
  }
  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});
router.post("/", async (req, res) => {
  try {
    const { name, price, des, img, category, occasions } = req.body;

    if (!name || !price  || !des || !img) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const newProduct = new Product({ name, price,des, img, category, occasions });
    await newProduct.save();
    res.status(201).json({ message: "Product created successfully.", product: newProduct });
  } catch (err) {
    console.error("Error creating product:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
});


// Update a product by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, price, des, img, category, occasions } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, des, img, category, occasions },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "Product updated successfully.", product: updatedProduct });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Delete a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});



module.exports = router;