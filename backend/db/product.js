const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0 },
  images: [String], 
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'  
  },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
