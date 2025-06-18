// const mongoose = require('mongoose');
// const Product = require('./product');




// const orderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   items: [{
//     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//     qty: Number,
//     price: Number
//   }],
//   total: Number,
//   status: { type: String, default: 'Pending' },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);



const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      name: String,   // snapshot of product name
      image: String,  // snapshot of product image
      qty: Number,
      price: Number   // snapshot of product price
    }
  ],
  total: Number,
  status: {
    type: String,
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
