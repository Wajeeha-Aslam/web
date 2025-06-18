const express = require("express");
const {handleUserSignup,handleUserLogin} = require("../controllers/user");
const { logoutUser } = require('../controllers/user');
const router = express.Router();


router.post("/signup",handleUserSignup);
router.post("/login",handleUserLogin);
router.get('/logout', logoutUser);
module.exports = router;

