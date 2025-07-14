const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authenticateToken = require("../middleware/authenticateToken");

router.get("/order/:productid", authenticateToken("ordererr"), orderController.viewOrderPage);
router.post("/post-order/:productid", authenticateToken("carterr"), orderController.placeOrder);
router.post("/remove-order", authenticateToken("carterr"), orderController.removeOrder);

module.exports = router;