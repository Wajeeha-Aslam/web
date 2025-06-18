const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Complaint = require('../models/Complaint');
const auth = require('../middlewares/auth');  // your auth middleware

// GET Contact Us page - only logged-in users
router.get('/contact', auth, (req, res) => {
  res.render('contact');  // render a contact form view
});

// POST Complaint submission
router.post('/contact', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { orderId, message } = req.body;

    // Validate orderId is valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).send('Invalid Order ID format.');
    }

    // Check order exists and belongs to this user
    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) {
      return res.status(400).send('Order not found or does not belong to you.');
    }

    // Create and save complaint
    const complaint = new Complaint({
      userId,
      orderId,
      message
    });

    await complaint.save();

    res.redirect('/complaints/my');  // redirect to user complaints list page
  } catch (err) {
    console.error('Complaint submission error:', err);
    res.status(500).send('Server error');
  }
});

// GET user complaints list
router.get('/complaints/my', auth, async (req, res) => {
  const userId = req.user._id;
  try {
    const complaints = await Complaint.find({ userId }).populate('orderId').sort({ createdAt: -1 });
    res.render('complaintsList', { complaints}); 
  

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
