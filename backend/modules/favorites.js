const mongoose = require('mongoose');
const product = require('../modules/product');
const favItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'sunglass', required: true },
  size: { type: String },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'sunglass' },
});

const favoritesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  items: [favItemSchema]
});

const favorites = mongoose.model('favorites', favoritesSchema);

module.exports = favorites;