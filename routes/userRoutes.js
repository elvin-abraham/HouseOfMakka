const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const pageController = require("../controllers/pageController");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/user", authenticateToken("carterr"), userController.userPanel);
router.get("/admin", authenticateToken("carterr"), userController.adminPanel);

router.post("/remove-cart", authenticateToken("carterr"), userController.removeCartItem);

router.get("/index2", authenticateToken("ordererr"), pageController.index2);
router.get("/index3", authenticateToken("ordererr"), pageController.index3);

module.exports = router;