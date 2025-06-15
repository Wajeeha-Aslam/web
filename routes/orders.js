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





// router.post('/cart/add', async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const userId = req.session.user._id;

//     let order = await Order.findOne({ user: userId });

//     if (!order) {
//       order = new Order({ user: userId, products: [] });
//     }

//     const existingItem = order.products.find(p => p.productId.equals(productId));

//     if (existingItem) {
//       existingItem.quantity += 1;
//     } else {
//       order.products.push({ productId });
//     }

//     await order.save();
//     res.status(200).json({ success: true });
//   } catch (err) {
//     console.error('Error adding to cart:', err);
//     res.status(500).json({ success: false });
//   }
// });


module.exports = router;
