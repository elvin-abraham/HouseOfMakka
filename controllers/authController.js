const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const User = require("../models/userModel");

const JWT_SECRET = "12345"; // move to .env for production

exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.redirect("/signup?message=All fields are required.");
  }

  if (!["admin", "user"].includes(role)) {
    return res.redirect("/signup?message=Invalid role selected.");
  }

  if (!validator.isAlphanumeric(username)) {
    return res.redirect("/signup?message=Username must be alphanumeric.");
  }

  if (!validator.isEmail(email)) {
    return res.redirect("/signup?message=Invalid email.");
  }

  if (!validator.isStrongPassword(password, {
    minLength: 6,
    minLowercase: 1,
    minUppercase: 0,
    minNumbers: 1,
    minSymbols: 0
  })) {
    return res.redirect("/signup?message=Password must be at least 6 characters and include a number.");
  }

  const existingUser = await User.findOne({ name: username, email });
  if (existingUser) {
    return res.redirect("/signup?message=User already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    name: username,
    email,
    password: hashedPassword,
    role
  });

  res.redirect("/");
};

exports.login = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.redirect("/login?message=All fields are required.");
  }

  const user = await User.findOne({ name: username, email });
  if (!user) {
    return res.redirect("/login?message=User not found.");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.redirect("/login?message=Wrong password.");
  }

  const token = jwt.sign({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  }, JWT_SECRET, { expiresIn: "1h" });

  res.cookie("token", token, { httpOnly: true });

  if (user.role === "admin") {
    res.redirect("/index3");
  } else {
    res.redirect("/index2");
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};