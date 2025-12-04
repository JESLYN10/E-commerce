const mongoose = require("mongoose");

const WishlistItemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
});

module.exports = mongoose.model("WishlistItem", WishlistItemSchema);
