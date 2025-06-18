const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const auth = require('../middlewares/auth');

// Show New Arrivals page
router.get('/new-arrivals', auth, async (req, res) => {
  try {
    // Example: Get products added in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const products = await Product.find({
      createdAt: { $gte: thirtyDaysAgo }
    }).sort({ createdAt: -1 });

    res.render('new-arrivals', { products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to load new arrivals');
  }
});



module.exports = router;
