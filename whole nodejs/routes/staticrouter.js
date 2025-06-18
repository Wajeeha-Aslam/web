// 


const express = require('express');
const router = express.Router();
const {checkSessionAuth } = require("../middlewares/checkSessionAuth");

router.get("/", checkSessionAuth, async (req, res) => {
    return res.render("landingpage");
});


router.get("/landingpage", (req, res) => {
  return res.render("landingpage");
});



router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});

module.exports = router;
