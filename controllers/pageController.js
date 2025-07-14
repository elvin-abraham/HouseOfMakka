const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { Product, Shirt } = require("../models/productModel");

const JWT_SECRET = "12345";

exports.renderAbout = (req, res) => res.render("about");
exports.renderContact = (req, res) => res.render("contact");
exports.renderBlog = (req, res) => res.render("blog");
exports.renderShop = (req, res) => res.render("shop");
exports.renderShopError = (req, res) => res.render("shoperr");
exports.renderCartError = (req, res) => res.render("carterr");

exports.newsSubscription = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.redirect("/news?message=Email is required");

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.render("news");
  return res.render("newserr");
};

exports.index2 = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const products = await Product.find();
    const shirts = await Shirt.find();
    const role = user.role;

    const navbaritem1 = '<li><a href="/user"><i class="fa-solid fa-user"></i></a></li>';
    const navbaritem2 = '<li><a href="/shop">Shop</a></li><li><a href="/blog">Blog</a></li>';
    const navbaritem3 = '<li><a href="/admin"><i class="fa-solid fa-user-tie"></i></a></li>';

    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");

    res.render("index", {
      products,
      shirts,
      navbaritem1,
      navbaritem2,
      navbaritem3,
      role,
      showAuthLinks: false,
      showAuthLinks2: true,
    });
  } catch (err) {
    res.status(500).send("Error loading user dashboard");
  }
};

exports.index3 = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const products = await Product.find();
    const shirts = await Shirt.find();
    const role = user.role;

    const navbaritem1 = '<li><a href="/admin"><i class="fa-solid fa-user-tie"></i></a></li>';
    const navbaritem2 = '<li><a href="/shop">Shop</a></li><li><a href="/blog">Blog</a></li>';
    const navbaritem3 = '<li><a href="/admin"><i class="fa-solid fa-user-tie"></i></a></li>';

    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");

    res.render("index", {
      products,
      shirts,
      navbaritem1,
      navbaritem2,
      navbaritem3,
      role,
      showAuthLinks: false,
      showAuthLinks2: true,
    });
  } catch (err) {
    res.status(500).send("Error loading admin dashboard");
  }
};