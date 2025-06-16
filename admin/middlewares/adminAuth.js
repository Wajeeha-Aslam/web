// routes/adminAuth.js (new file)
const express = require('express');
const router = express.Router();


function adminAuth(req, res, next) {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  res.status(403).send('Access denied. Admins only.');
}

module.exports = adminAuth;
