const mongoose = require('mongoose');
const product = require('../modules/product');
const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'sunglass', required: true },
  size: { type: String },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'sunglass' },
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  items: [orderItemSchema]
});

const order = mongoose.model('order', orderSchema);

module.exports = order;