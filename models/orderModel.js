const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: String,
  title: String,
  userName: String,
  userAddress: String,
  userPincode: Number,
  cardName: String,
  cvv: Number,
  expiryMonth: String,
  expiryYear: String,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;