const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const authenticateToken = require("../middleware/authenticateToken");

const productController = require("../controllers/productController");

router.get("/home", (req, res) => {
  res.redirect("/");
});


router.get("/about", pageController.renderAbout);
router.get("/contact", pageController.renderContact);
router.get("/blog", authenticateToken("ordererr"), pageController.renderBlog);
router.get("/shop", authenticateToken("ordererr"), pageController.renderShop);
router.get("/shoperr", pageController.renderShopError);
router.get("/add-to-cart/:productid/err", pageController.renderCartError);
router.post("/news", authenticateToken("ordererr"), pageController.newsSubscription);

module.exports = router;