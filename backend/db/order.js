const mongoose = require('mongoose');
 const orderSchema = new mongoose.Schema({
    date: date,
    items: Array(any),
    status: Number,
 });

 const order = mongoose.model('order', orderSchema);
 module.exports = order;