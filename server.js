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
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false // set to true in production with HTTPS
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





mongoose.connect('mongodb://localhost:27017/webproducts').then(() => 
  console.log('✅ MongoDB connected successfully'));

const uploadRoutes = require('./admin/middlewares/upload');
server.use('/admin', uploadRoutes);



const adminRoutes = require("./admin/routes/adminRoutes");
server.use('/admin', adminRoutes);


const ordersRouter = require('./routes/orders');
// ...
server.use('/', ordersRouter);

server.use("/user",userRoutes);
// server.use("/",staticRoutes);
server.use("/",staticRoutes);

// server.use('/upload', express.static(path.join(__dirname, 'upload')));
// server.use('/upload', express.static('public/upload'));
const path = require('path');
server.use('/upload', express.static(path.join(__dirname, 'upload')));



server.get('/landingpage-test', (req, res) => {
  res.send('Landingpage route is working');
});







// server.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (user && await bcrypt.compare(password, user.password)) {
//     req.session.userId = user._id;
//     res.redirect('/my-orders');
//   } else {
//     res.send('Invalid credentials');
//   }
//   // ✅ Store user ID in session
//   req.session.userId = user._id;

//   res.status(200).json({ message: 'Login successful' });

// });







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