const {getUser} = require("../service/auth");



async function checkSessionAuth(req, res, next) {
   const userUid = req.cookies?.uid;

   if(!userUid) return res.redirect("/login");
   const user = getUser(userUid);

  //  if(!user) return res.redirect("/login");
  //  req.user=user;
  // next();

  // Also check that uid is for a customer, not admin!
  if (!user) return res.redirect("/login");
  if (user.role !== 'User' && user.role !== 'Admin') {
    return res.status(401).json({ message: "Unauthorized — please log in" });
  }

  req.user = user;
  next();
};




module.exports = { 
                  checkSessionAuth,
};