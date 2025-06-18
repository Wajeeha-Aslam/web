
const Product = require('../../models/product');


const Order = require('../../models/order');


const adminController = require('../controllers/adminController');






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
    const { name, price, description } = req.body;
    const image = req.file ? '/upload/' + req.file.filename : null;

    await Product.create({ name, price, description, image });

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
  const productId = req.params.id;
  const { name, price, color, department, description } = req.body;

  try {
    const product = await Product.findById(productId);

    product.name = name;
    product.price = price;
    product.color = color;
    product.department = department;
    product.description = description;

    // 🔑 If a new file is uploaded, replace it
    if (req.file) {
      product.image = '/upload/' + req.file.filename; // matches your multer destination
    }

    await product.save();
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating product');
  }
};

exports.postDeleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/admin/products');
};

exports.listOrders = async (req, res) => {
  const orders = await Order.find()
   .populate('user')  // <<== this is the missing part
    .sort({ createdAt: -1 }); // use createdAt since orderDate is not in your schema

  res.render('orders-list', { orders ,layout:false});
};

exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  await Order.findByIdAndUpdate(req.params.id, { status });
  res.redirect('/admin/orders');
};







