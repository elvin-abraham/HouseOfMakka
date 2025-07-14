const User = require("../models/userModel");
const Order = require("../models/orderModel");
const { Product, Shirt } = require("../models/productModel");

exports.userPanel = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const orders = await Order.find({ userId });

    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    res.render("userpanel", { user, orders });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.adminPanel = async (req, res) => {
  try {
    const user = req.user;
    if (user.role !== "admin") {
      return res.status(403).send("Access denied: You are not an admin");
    }

    const users = await User.find().populate("cart.productId").exec();
    const orders = await Order.find().populate("userId").exec();
    const products = await Product.find();
    const shirts = await Shirt.find();

    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");

    res.render("adminpanel", {
      users,
      orders,
      products,
      shirts,
    });
  } catch (error) {
    console.error("Admin panel error:", error);
    res.status(500).send("Server error");
  }
};

exports.removeCartItem = async (req, res) => {
  const userId = req.user.id;
  const itemsToRemove = req.body.cartItems;

  try {
    const user = await User.findById(userId);
    if (!user) return res.redirect("/login?message=User not found");

    if (Array.isArray(itemsToRemove)) {
      user.cart = user.cart.filter(item => !itemsToRemove.includes(item.productId.toString()));
    } else {
      user.cart = user.cart.filter(item => item.productId.toString() !== itemsToRemove);
    }

    await user.save();
    res.redirect("/user");
  } catch (err) {
    console.error("Remove cart error:", err);
    res.status(500).send("Error removing cart item.");
  }
};