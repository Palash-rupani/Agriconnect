const mongoose = require('mongoose');
 const wishlistSchema = new mongoose.Schema({
    userid: {type:Schema.Types.ObjectId, ref: 'User'},
    productId:Array(String),
 });

 const wishlist = mongoose.model('wishlist', wishlistSchema);
 module.exports = wishlist;