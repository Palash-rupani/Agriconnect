const mongoose = require('mongoose'); // ✅ correct spelling

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
