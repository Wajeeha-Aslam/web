const express = require("express");
const router = express.Router();
const Order = require("../models/order");

function isLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.redirect("/login");
  }
}


// router.get("/my-orders", isLoggedIn, async (req, res) => {
//   try {
//     const userId = req.session.user._id;

//     const orders = await Order.find({ userId })
//       .populate("user") 
//       .populate("products.productId")
//       .sort({ createdAt: -1 });

//     res.render("my-orders", { orders });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Something went wrong");
//   }
// });



router.get('/my-orders', isLoggedIn, async (req, res) => {
  try {
    const userId = req.session.user._id;
    console.log('Current userId:', userId);  

    const orders = await Order.find({ user: userId })
      .populate("user") 
      .populate("products.productId")
      .sort({ createdAt: -1 });

    
       const flashMessage = req.session.flashMessage;
      req.session.flashMessage = null;

    console.log('Orders found:', orders);  

   res.render('my-order', { orders, message: flashMessage });
  } catch (err) {
    console.error('[my-orders] Error:', err);
    res.render('/landinpage',flashMessage);
  }
});


module.exports = router;
