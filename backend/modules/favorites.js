const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'sunglass', required: true },
  size: { type: String },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'sunglass' },
});

const favoritesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  items: [cartItemSchema]
});

const favorites = mongoose.model('favorites', favoritesSchema);

module.exports = favorites;