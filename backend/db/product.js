const mongoose = require('mongoose');
 const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    purchaseprice: Number,
    sellprice: Number,
    Images:Array(String),
    categoryID: {
        type: mongose.Schema.Types.ObjectId,
        ref: 'category'
        },
 });

 const product = mongoose.model('product', productSchemaSchema);
 module.exports = product;