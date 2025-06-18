const express = require('express');
const router = express.Router();
// const adminController = require('../controllers/adminController');
const multer = require('multer');
const path = require('path');
const adminController = require('../controllers/adminController');

const Order = require('../../models/order');



const Complaint = require('../../models/Complaint');
const adminAuth = require('../middlewares/adminAuth');


// router.get("/complaints",  async (req, res) => {
//   try {
//     const complaints = await Complaint.find()
//       .populate('userId', 'email')
//       .populate('orderId')
//       .sort({ createdAt: -1 });
//     res.render('admin-complaints', { complaints, layout: false }); // use admin layout or set false
//   } catch (err) {
//     console.error('Admin complaints view error:', err);
//     res.status(500).send('Server Error');
//   }
// });


router.get("/complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate('userId', 'email')   // populate user email
      .populate('orderId')            // populate full order info
      .sort({ createdAt: -1 });
    
    res.render('admin-complaints', { complaints, layout: false });
  } catch (err) {
    console.error('Admin complaints view error:', err);
    res.status(500).send('Server Error');
  }
});

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.post("/products/add", upload.single("image"), adminController.postAddProduct);


router.post('/adminlogin', (req, res) => {
  const { username, password ,email} = req.body;

  // Simple hardcoded example (DON'T use in production!)
  if (username === 'admin' && password === 'adminpass' && email === 'admin@example.com') {
    // Save admin info in session or cookie
    req.session.isAdmin = true;
    res.redirect('/admin/products');
  } else {
    res.render('adminlogin', { error: 'Invalid credentials' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});





// Product routes
router.get('/products',adminController.listProducts);
router.get('/products/add',adminController.getAddProduct);
router.post('/products/add',adminController.postAddProduct);
router.get('/products/edit/:id',  adminController.getEditProduct);
router.post('/products/edit/:id', upload.single('image'), adminController.postEditProduct);
router.post('/products/delete/:id', adminController.postDeleteProduct);

// In routes/admin.js
router.post('/orders/:id/status', adminController.updateOrderStatus);


// Order routes
router.get('/orders', adminController.listOrders);
router.post('/orders/status/:id', adminController.updateOrderStatus);


// Public route — no adminAuth here
router.get('/login', (req, res) => {
  res.render('adminlogin');
});


module.exports = router;
