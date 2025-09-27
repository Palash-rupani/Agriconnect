const mongoose = require('mongoose');
// ✅ Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: { type: Boolean, default: false },
    isFarmer: { type: Boolean, default: false },  // 👈 camelCase
});


 const User = mongoose.model('User', userSchema);
 module.exports = User;