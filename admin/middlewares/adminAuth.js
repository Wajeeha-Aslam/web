// routes/adminAuth.js (new file)
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');



router.get('/login', (req, res) => {
  res.render('admin/login'); // create this view
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simple hardcoded example (DON'T use in production!)
  if (username === 'admin' && password === 'adminpass') {
    // Save admin info in session or cookie
    req.session.isAdmin = true;
    res.redirect('/admin/products');
  } else {
    res.render('admin/login', { error: 'Invalid credentials' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;





function adminAuth(req, res, next) {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  res.status(403).send('Access denied. Admins only.');
}

module.exports = adminAuth;
