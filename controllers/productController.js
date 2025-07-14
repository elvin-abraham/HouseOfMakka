const { Product, Shirt } = require("../models/productModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "12345";

exports.renderHome = async (req, res) => {
  try {
    const products = await Product.find();
    const shirts = await Shirt.find();
    const showAuthLinks = true;
    const showAuthLinks2 = false;
    const navbaritem1 = '<li><a href="/user"><i class="fa-solid fa-user"></i></a></li>';
    const navbaritem2 = '<li><a href="/shop">Shop</a></li><li><a href="/blog">Blog</a></li>';
    
    res.render("index", { products, shirts, showAuthLinks, showAuthLinks2, navbaritem1, navbaritem2 });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error loading products");
  }
};

exports.renderProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productid);
    res.render("product", { product });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error loading product");
  }
};

exports.renderShirt = async (req, res) => {
  try {
    const shirt = await Shirt.findById(req.params.shirtid);
    res.render("product", { product: shirt });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error loading shirt");
  }
};

exports.addToCart = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.render("carterr");

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;
    const productId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.redirect("/login?message=User not found");

    const existingItem = user.cart.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({ productId, quantity: 1 });
    }

    await user.save();

    res.render("cartres");
  } catch (err) {
    console.error("Cart add error:", err);
    res.redirect("/login?message=Session expired. Please login again.");
  }
};