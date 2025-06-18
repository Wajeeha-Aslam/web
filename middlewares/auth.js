module.exports = function (req, res, next) {
   const flashMessage = req.session.flashMessage;
  if (req.session && req.session.userId)
     
    return next();


  return res.redirect("/landingpage");
};
