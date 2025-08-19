const mongoose = require('mongoose');
 const cartSchema = new mongoose.Schema({
    userid: {type:Schema.Types.ObjectId, ref: 'User'},
    productId:Array(String),
 });

 const cart = mongoose.model('cart', cartSchema);
 module.exports = cart;