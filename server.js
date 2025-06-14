let express = require("express");
let expresslayouts = require("express-ejs-layouts");
const session = require("express-session");
const mongoose= require("mongoose");
const bcrypt = require("bcrypt");
let server = express();



server.use(express.static("public"));


const  cookieParser = require("cookie-parser")
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
// Session setup
server.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false
}));

// After session middleware:
server.use((req, res, next) => {
  res.locals.user = req.session.userId ? /* fetch or flag */ true : null;
  next();
});




server.set("view engine","ejs");
server.use(expresslayouts);



const User = require("./models/user");
const userRoutes = require("./routes/user");
const staticRoutes = require("./routes/staticrouter");
const{restrictedToLoggedinUserOnly, checkSessionAuth}=require("./middlewares/checkSessionAuth")




mongoose.connect('mongodb://localhost:27017/webproducts').then(() => 
  console.log('✅ MongoDB connected successfully'));





server.use("/user",userRoutes);
// server.use("/",staticRoutes);
server.use("/",staticRoutes);




server.get('/landingpage-test', (req, res) => {
  res.send('Landingpage route is working');
});







server.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user._id;
    res.redirect('/my-orders');
  } else {
    res.send('Invalid credentials');
  }
});

server.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

server.get('/login', (req, res) => {
  res.render('login',{layout:false}); 
});




server.get("/landingpage", (req,res)=>{
    res.render("landingpage");
});

server.get('/cv',(req,res)=>{
    res.render('cv',{layout:false});
});

server.get('/checkout',(req,res)=>{
    res.render('checkout',{layout:false});
});

server.get('/checkoutpw',(req,res)=>{
    res.render('checkoutpw',{layout:false});
});
server.listen(4000,()=>{
    console.log("server started at localhost:4000");

});