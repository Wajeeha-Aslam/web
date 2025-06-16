
const Product = require('../../models/product');


const Order = require('../../models/order');

// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");


// const auth = require("../middlewares/adminAuth")
const adminController = require('../controllers/adminController');






// router.post("/products/add", upload.single("image"), adminController.postAddProduct);










exports.listProducts = async (req, res) => {
  const products = await Product.find();
  res.render('products-list', {
    products,
    layout: false 
  });
};


exports.getAddProduct = (req, res) => {
  res.render('add-product', { layout: false });
};

exports.postAddProduct = async (req, res) => {
  try {
    const { title, price, description } = req.body;
    const image = req.file ? '/upload/' + req.file.filename : null;

    await Product.create({ title, price, description, image });

    res.redirect('/admin/products');
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).send("Internal Server Error");
  }
};





exports.getEditProduct = async (req, res) => {
  console.log("param id:", req.params.id);
  // should be an ObjectId string, not 'products'
  const product = await Product.findById(req.params.id);
  res.render('edit-product', {
    product,
    layout: false 
  });
};

exports.postEditProduct = async (req, res) => {
  const { title, price, description, imageUrl } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { title, price, description, imageUrl });
  res.redirect('/admin/products');
};

exports.postDeleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/admin/products');
};

exports.listOrders = async (req, res) => {
  const orders = await Order.find().sort({ orderDate: -1 });
  res.render('orders-list', { orders });
};

exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  await Order.findByIdAndUpdate(req.params.id, { status });
  res.redirect('/admin/orders');
};




