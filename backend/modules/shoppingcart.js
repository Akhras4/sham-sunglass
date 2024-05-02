const mongoose = require('mongoose');
const product = require('../modules/product');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'sunglass', required: true },
  size: { type: String },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'sunglass' },
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  items: [cartItemSchema]
});

const ShoppingCart = mongoose.model('ShoppingCart', cartSchema);

module.exports = ShoppingCart;