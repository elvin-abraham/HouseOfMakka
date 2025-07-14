// server.js

require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB=require("./config/db")

// Create Express app
const app = express();

// Connect to MongoDB

connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Set views and view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Custom Cache Control Headers (optional but useful)
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

// Routes
const authRoutes = require("./routes/authRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const pageRoutes = require("./routes/pageRoutes");

app.use(authRoutes);
app.use(chatbotRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(userRoutes);
app.use(pageRoutes);


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

