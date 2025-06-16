let express = require("express");
let expresslayouts = require("express-ejs-layouts");
const session = require("express-session");
const mongoose= require("mongoose");
const bcrypt = require("bcrypt");
let server = express();



server.use(express.static("public"));


const  cookieParser = require("cookie-parser");


server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
// Session setup
server.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
     cookie: { maxAge: 60000 * 60 * 24 },
    httpOnly: true,
    secure: false 
  }
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

server.use("/user",userRoutes);
server.use("/",staticRoutes);



mongoose.connect('mongodb://localhost:27017/webproducts').then(() => 
  console.log('✅ MongoDB connected successfully'));






const adminRoutes = require("./admin/routes/adminRoutes");
server.use('/admin', adminRoutes);

const ordersRouter = require('./routes/orders');
server.use('/', ordersRouter);

const productsRoutes = require('./routes/products'); 
server.use("/",productsRoutes);

const cartRoutes = require('./routes/cart');
server.use('/', cartRoutes);


server.use((req, res, next) => {
  console.log('📥 Incoming request:', req.method, req.url);
  next();
});



// console.log('adminRoutes:', adminRoutes);
// console.log('ordersRouter:', ordersRouter);
// console.log('productsRoutes:', productsRoutes);
// console.log('cartRoutes:', cartRoutes);


const path = require('path');
server.use('/upload', express.static(path.join(__dirname, 'upload')));









server.get('/landingpage-test', (req, res) => {
  res.send('Landingpage route is working');
});













server.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
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
