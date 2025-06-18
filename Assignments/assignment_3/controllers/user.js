const User = require("../models/user");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid Username or password",
    });
  }


    req.session.user = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
  };
  req.session.userId = user._id; // ✅ Core fix
  return res.redirect("/landingpage");
}


async function logoutUser(req, res) {
  res.clearCookie('uid'); 
  return res.redirect('/login');
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
  logoutUser,
};
