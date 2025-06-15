// const Product = require('../../models/Product');
// const Product = require('./models/product');
const Product = require('../../models/product');

const Order = require('../../models/order');

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
  const { title, price, description, imageUrl } = req.body;
  await Product.create({ title, price, description, imageUrl });
  res.redirect('/admin/products');
};

// exports.getEditProduct = async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   res.render('edit-product', {
//     product,
//     layout: false 
//   });
// };

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




