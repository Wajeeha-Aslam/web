const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.redirect("/login");
  }
}

// GET /my-orders
router.get("/my-orders", isLoggedIn, async (req, res) => {
  try {
    const userId = req.session.user._id;

    const orders = await Order.find({ userId })
      .populate("user") 
      .populate("products.productId")
      .sort({ createdAt: -1 });

    res.render("my-orders", { orders });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
