const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Order = require('../models/order'); // FIXED: relative path
const auth = require('../middlewares/auth');

// GET /my-orders — HTML page
// router.get('/my-orders', auth, async (req, res) => {
//   try {
//     const userId = req.session.userId; // ✅ must be set at login
//     const orders = await Order.find({ user: userId })
//       .sort({ createdAt: -1 })
//       .populate('items.productId'); // ✅ so productId has name, price, etc.

//     res.render('my-order', { orders }); // ✅ render EJS, not JSON
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to fetch your orders' });
//   }
// });

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


module.exports = router;
