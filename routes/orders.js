const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Order = require('../models/order'); 
const auth = require('../middlewares/auth');



router.get('/my-orders', auth, async (req, res) => {
  try {
    const userId = req.session.userId;
    console.log('Current userId:', userId);  // ✅ debug

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('items.productId');

    console.log('Orders found:', orders);  // ✅ debug

    res.render('my-order', { orders });
  } catch (err) {
    console.error('❌ [my-orders] Error:', err);
    res.status(500).json({ message: 'Failed to fetch your orders', error: err.message });
  }
});


// routes/orders.js
router.get('/create-order', auth, async (req, res) => {
  try {
    const Order = require('../models/order');

    // Example order data
    const newOrder = new Order({
      user: req.session.userId,
      items: [
        {
          productId: "60f6e2c79948b028dcabddf1", // replace with a real Product ID
          qty: 1,
          price: 100
        }
      ],
      total: 100
    });

    await newOrder.save();
    res.send('Fake order created!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to create fake order');
  }
});




const mongoose = require('mongoose');
// router.post('/add-to-order', async (req, res) => {
//   const { productId, qty } = req.body;

//   console.log('👉 Received:', { productId, qty });

//   // Validate ObjectId
//   if (!mongoose.Types.ObjectId.isValid(productId)) {
//     console.log('❌ Invalid ObjectId');
//     return res.status(400).send('Invalid productId');
//   }

//   // Query product
//   const product = await Product.findById(productId);
//   console.log('👉 Queried product:', product);

//   if (!product) {
//     return res.status(404).send('Product not found');
//   }

//   // Store in session cart
//   if (!req.session.cart) req.session.cart = [];

//   req.session.cart.push({
//     product: product.toObject(),
//     qty: Number(qty)
//   });

//   console.log('👉 Updated cart:', req.session.cart);

//   res.redirect('/my-orders');
// });


router.post('/add-to-order', auth, async (req, res) => {
  const { productId, qty } = req.body;
  const product = await Product.findById(productId);

  if (!product) return res.send("Product not found");

  const newOrder = new Order({
    user: req.session.userId,  // or use your auth middleware’s user ID
    items: [{
      productId: product._id,
      name: product.name,    // ✅ add snapshot
      image: product.image,  // ✅ add snapshot
      qty: Number(qty),
      price: product.price   // ✅
    }],
    total: product.price * Number(qty)
  });

  await newOrder.save();

  res.redirect('/my-orders');
});

router.post('/checkout', async (req, res) => {
  const orderId = req.body.orderId;

  // Fetch the order from DB
  const Order = require('../models/order'); // adjust path as needed
  const order = await Order.findById(orderId).populate('items.productId');;

  if (!order) {
    return res.status(404).send("Order not found");
  }

  res.render('checkout', { order }); // Make sure you have checkout.ejs
});

router.post('/confirm-checkout', async (req, res) => {
  const { orderId, name, address, payment } = req.body;

  // Save or process this info here...
  console.log(`Order confirmed: ${orderId}, Name: ${name}, Address: ${address}, Payment: ${payment}`);

  res.send("Thank you! Your order has been confirmed.");
});

module.exports = router;
