const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/signup", (req, res) => res.render("signup", { message: req.query.message }));
router.post("/signup", authController.signup);

router.get("/login", (req, res) => res.render("login", { message: req.query.message }));
router.post("/login", authController.login);

router.post("/logout", authController.logout);

module.exports = router;