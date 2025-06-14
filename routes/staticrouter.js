// 


const express = require('express');
const router = express.Router();
const {  restrictedToLoggedinUserOnly,checkSessionAuth } = require("../middlewares/checkSessionAuth");

router.get("/", checkSessionAuth, async (req, res) => {
    return res.render("landingpage");
});


router.get("/landingpage", (req, res) => {
  return res.render("landingpage");
});

router.get('/landingpage', restrictedToLoggedinUserOnly, (req, res) => {
  res.send(`Welcome to your dashboard! Your ID is ${req.userId}`);
});



router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

module.exports = router;
