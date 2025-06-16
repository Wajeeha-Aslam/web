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

// // POST /add-to-order
// router.post('/add-to-order', auth, async (req, res) => {
//   try {
//     const userId = req.session.userId;
//     const { productId, price, qty } = req.body;

//     // Check if an open order exists — for simplicity, we’ll create a new order for each item.
//     const order = new Order({
//       user: userId,
//       items: [{
//         productId: productId,
//         qty: Number(qty),
//         price: Number(price)
//       }],
//       total: Number(price) * Number(qty)
//     });

//     await order.save();
//     console.log('✅ New order saved:', order);

//     res.redirect('/my-orders'); // Go to orders page
//   } catch (err) {
//     console.error('❌ [add-to-order] Error:', err);
//     res.status(500).send('Failed to add to order');
//   }
// });


// // ADD TO ORDER — properly fixed
// router.get('/add-to-order', auth, async (req, res) => {
//   try {
//     const userId = req.session.userId;
//     const productId = req.query.productId;
//     const qty = parseInt(req.query.qty) || 1;

//     // 1️⃣ Validate input
//     if (!productId) {
//       return res.status(400).send('Missing productId');
//     }

//     // 2️⃣ Look up product from DB
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).send('Product not found');
//     }

//     // 3️⃣ Calculate
//     const price = product.price;  // assuming your product schema has 'price'
//     const total = price * qty;

//     // 4️⃣ Create order
//     const newOrder = new Order({
//       user: userId,
//       items: [
//         {
//           productId: product._id,
//           qty: qty,
//           price: price
//         }
//       ],
//       total: total
//     });

//     await newOrder.save();
//     console.log('✅ Order created:', newOrder);
//     res.redirect('/my-orders'); // or send JSON

//   } catch (err) {
//     console.error('❌ [add-to-order] Error:', err);
//     res.status(500).send('Something went wrong while adding to order');
//   }
// });


// router.post('/add-to-order', async (req, res) => {
//   console.log(req.body); // check in terminal
//   res.send('Added to order!');
  
  
//   const { productId, qty } = req.body;

//   // Simple debug
//   console.log('Adding to order:', productId, qty);

//   // TODO: Your logic — e.g. find product, add to order/cart
//   const product = await Product.findById(productId);

//   if (!product) {
//     return res.status(404).send('Product not found');
//   }

//   // Example: store order in session, DB, etc.
//   // For now just send back success:
//   res.send(`Added ${qty} of ${product.name} to order!`);
// });

// router.post('/add-to-order', async (req, res) => {
//   const { productId, qty } = req.body;

//   // 1️⃣ Fetch the product
//   const product = await Product.findById(productId);

//   if (!product) {
//     return res.status(404).send('Product not found');
//   }

//   // 2️⃣ Add it to user's order/cart
//   // (Session, DB, or custom order model)
//   // Example: save to session
//   if (!req.session.order) {
//     req.session.order = [];
//   }
//   req.session.order.push({
//     productId,
//     qty,
//     price: product.price
//   });

//   // 3️⃣ Redirect back to products page or order summary
//   res.redirect('/my-orders'); // Or any page you want
// });

const mongoose = require('mongoose');

router.post('/add-to-order', async (req, res) => {
  console.log("productId from req.body:", req.body.productId);

  const { productId, qty } = req.body;
  console.log('Received productId:', productId, 'qty:', qty);

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).send('Invalid product ID');
  }

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).send('Product not found');
  }

  // Your code to add product to order...

  res.send('Added to order!');
});


module.exports = router;
