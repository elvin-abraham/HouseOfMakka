const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  brand: String,
  price: Number,
  image: String,
});

const shirtSchema = new mongoose.Schema({
  title: String,
  brand: String,
  price: Number,
  image: String,
});

const Product = mongoose.model("Product", productSchema, "Products");
const Shirt = mongoose.model("Shirt", shirtSchema, "Shirts");

module.exports = { Product, Shirt };