const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuth = require('../middlewares/adminAuth');


const Order = require('../../models/order');






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
router.post('/products/edit/:id', adminController.postEditProduct);
router.post('/products/delete/:id', adminController.postDeleteProduct);

// router.get('/orders', (req, res) => {
//   res.send('Admin orders route working!');
// });


// Order routes
router.get('/orders', adminController.listOrders);
router.post('/orders/status/:id', adminController.updateOrderStatus);


// Public route — no adminAuth here
router.get('/login', (req, res) => {
  res.render('adminlogin');
});


module.exports = router;
