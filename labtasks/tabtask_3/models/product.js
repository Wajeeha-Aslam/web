const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  color: String,
  department: String,
  description: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true , collection: 'products' });
module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);