const express = require("express");
const {handleUserSignup,handleUserLogin} = require("../controllers/user");

const router = express.Router();


router.post("/signup",handleUserSignup);
router.post("/login",handleUserLogin);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { handleUserSignup, handleUserLogin } = require("../controllers/user");

// router.post("/", handleUserSignup);
// router.post("/login", handleUserLogin);

// module.exports = router;
