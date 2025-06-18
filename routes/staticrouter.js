const express = require('express');
const router = express.Router();
const {checkSessionAuth } = require("../middlewares/checkSessionAuth");

router.get("/", checkSessionAuth, async (req, res) => {
    return res.render("landingpage");
});



router.get("/landingpage", (req, res) => {
  const flashMessage = req.session.flashMessage;
  // clear it so it doesn’t persist forever
  req.session.flashMessage = null;
  res.render("landingpage", { flashMessage });
});


router.get("/signup", (req, res) => {
    return res.render("signup");
});


router.get('/login', (req, res) => {
  res.render('login', { message: null });
});








module.exports = router;
