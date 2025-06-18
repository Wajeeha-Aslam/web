// routes/adminAuth.js (new file)
const express = require('express');
const router = express.Router();


function adminAuth(req, res, next) {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  res.status(403).send('Access denied. Admins only.');
}


module.exports = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.isAdmin) {
    // If user is logged in and isAdmin is true
    next();
  } else {
    res.redirect('/login'); // or send 403
  }
};

module.exports = adminAuth;
