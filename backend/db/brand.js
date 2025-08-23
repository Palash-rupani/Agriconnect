const mongoose = require('mongoose'); // ✅ correct spelling

const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const brand = mongoose.model('brands', BrandSchema);
module.exports = brand;
