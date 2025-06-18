const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Order = require('../models/order'); 
const auth = require('../middlewares/auth');



router.get('/my-orders', auth, async (req, res) => {
  try {
    const userId = req.session.userId;
    console.log('Current userId:', userId);  

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('items.productId');


     const flashMessage = req.session.flashMessage;
      req.session.flashMessage = null;

    console.log('Orders found:', orders);  

    res.render('my-order', { orders, message: flashMessage });
  } catch (err) {
    console.error('[my-orders] Error:', err);
    res.render('/landinpage',flashMessage);
  }
});



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



router.post('/add-to-order', auth, async (req, res) => {
  const { productId, qty } = req.body;
  const product = await Product.findById(productId);

  if (!product) return res.send("Product not found");

  const newOrder = new Order({
    user: req.session.userId,  
    items: [{
      productId: product._id,
      name: product.name,    
      image: product.image,  
      qty: Number(qty),
      price: product.price   
    }],
    total: product.price * Number(qty)
  });

  await newOrder.save();


    req.session.flashMessage = 'Order placed successfully!';

  res.redirect('/my-orders');
});

router.post('/checkout', async (req, res) => {
  const orderId = req.body.orderId;

  // Fetch order from DB
  const Order = require('../models/order'); 
  const order = await Order.findById(orderId).populate('items.productId');;

  if (!order) {
    return res.status(404).send("Order not found");
  }

  res.render('checkout', { order }); 
});

router.post('/confirm-checkout', async (req, res) => {
  const { orderId, name, address, payment } = req.body;

  console.log(`Order confirmed: ${orderId}, Name: ${name}, Address: ${address}, Payment: ${payment}`);

  res.send("Thank you! Your order has been confirmed.");
});

module.exports = router;
