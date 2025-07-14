const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/", productController.renderHome);
router.get("/product/:productid", authenticateToken("ordererr"), productController.renderProduct);
router.get("/shirt/:shirtid", authenticateToken("ordererr"), productController.renderShirt);
router.get("/add-to-cart/:id", authenticateToken("ordererr"), productController.addToCart);

module.exports = router;