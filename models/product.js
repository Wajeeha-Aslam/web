const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  color: String,
  department: String,
  description: String,
  image: String,
});
module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);