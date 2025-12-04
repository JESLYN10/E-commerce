const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authenticateUser = require("../middleware/authmiddleware");

router.get("/:userId", async (req, res) => {
  const items = await Order.find({ userId: req.params.userId });
  res.json(items);
});

router.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const order = new Order({ userId, productId, quantity });
  await order.save();
  res.json(order);
});

router.delete("/:id",  authenticateUser,async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
