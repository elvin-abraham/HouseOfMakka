const Order = require("../models/orderModel");
const { Product, Shirt } = require("../models/productModel");
const User = require("../models/userModel");

exports.viewOrderPage = async (req, res) => {
  const buyProduct = req.params.productid;
  try {
    let product = await Product.findById(buyProduct) || await Shirt.findById(buyProduct);
    if (!product) return res.status(404).send("Product not found");
    res.render("order", { productid: buyProduct, title: product.title });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching product");
  }
};

exports.placeOrder = async (req, res) => {
  try {
    const productid = req.params.productid;
    const { user, address, pincode, productdetails, cardname, cardaddress, expirymonth, expiryyear } = req.body;
    const userId = req.user.id;

    const order = new Order({
      userId,
      productId: productid,
      title: productdetails,
      userName: user,
      userAddress: address,
      userPincode: pincode,
      cardName: cardname,
      cvv: cardaddress,
      expiryMonth: expirymonth,
      expiryYear: expiryyear,
    });

    await order.save();
    res.render("orderres");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error placing order");
  }
};

exports.removeOrder = async (req, res) => {
  const userId = req.user.id;
  const orderIds = req.body.orderItems;

  try {
    if (Array.isArray(orderIds)) {
      await Order.deleteMany({ _id: { $in: orderIds }, userId });
    } else {
      await Order.deleteOne({ _id: orderIds, userId });
    }
    res.redirect("/user");
  } catch (err) {
    console.error("Remove order error:", err);
    res.status(500).send("Error removing order");
  }
};