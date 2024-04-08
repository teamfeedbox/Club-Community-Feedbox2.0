const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  quantity: {type: Number, required: true},
  imageId: {type: String, required: true},
  createdAt: { type: Date, default: Date.now }
});

const Merchandise = mongoose.model('products', productSchema);

module.exports = Merchandise;
