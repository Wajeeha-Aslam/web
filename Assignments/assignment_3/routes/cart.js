// const express = require('express');
// const router = express.Router();
// const Product = require('../models/product');
// const auth = require('../middlewares/auth');
// const Product = require('../routes/products'); 
// router.post('/add-to-cart', auth, async (req, res) => {
//   const { productId, qty } = req.body;
//   try {
//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).send('Product not found');

//     if (!req.session.cart) {
//       req.session.cart = [];
//     }
//     req.session.cart.push({ productId, qty: parseInt(qty), price: product.price });

//     res.redirect('/new-arrivals');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Failed to add to cart');
//   }
// });

// // ✅ ✅ ✅ THE MOST IMPORTANT LINE:
// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const Product = require('../models/product'); // make sure path is correct

// router.post('/add-to-cart', async (req, res) => {
//   const productId = req.body.productId;
//   const quantity = parseInt(req.body.qty) || 1;

//   try {
//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).send('Product not found');
//     }

//     // Initialize cart if it doesn't exist
//     if (!req.session.cart) {
//       req.session.cart = [];
//     }

//     // Check if product is already in cart
//     const cartItem = req.session.cart.find(item => item.product._id.toString() === productId);
    
//     if (cartItem) {
//       cartItem.quantity += quantity;
//     } else {
//       req.session.cart.push({ product, quantity });
//     }

//     res.redirect('/cart'); // or back to product page
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   }
// });

// module.exports = router;
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // adjust path if needed

router.post('/add-to-cart', async (req, res) => {
  console.log('🎯 Add-to-cart hit!');
  console.log('Body:', req.body);

  const productId = req.body.productId;
  console.log('🛒 Product ID received:', productId);

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    console.log('❌ Invalid ObjectId format');
    return res.status(400).send('Invalid product ID format');
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      console.log('❌ Product not found in DB');
      return res.status(404).send('Product not found');
    }

    // Initialize session cart
    if (!req.session.cart) {
      req.session.cart = [];
    }

    // Add/update cart
    const existing = req.session.cart.find(item => item.product._id.toString() === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      req.session.cart.push({ product, quantity: 1 });
    }

    console.log('✅ Product added to cart');
    res.redirect('/cart');
  } catch (err) {
    console.error('🔥 Error:', err);
    res.status(500).send('Internal server error');
  }
});



module.exports = router;
