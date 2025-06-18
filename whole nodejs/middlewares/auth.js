module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user;  // ✅ set req.user
    next();
  } else {
    res.redirect('/login');  // or res.status(401).send('Unauthorized');
  }
};
