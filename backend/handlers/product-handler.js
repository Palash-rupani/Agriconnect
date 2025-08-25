const product = require('../db/product');

async function addProduct(model) {
    let newProduct = new product(model);
    await newProduct.save();
    return newProduct.toObject();
}

async function updateproduct(id, model) {
    await product.findByIdAndUpdate(id, model);
}

async function deleteproduct(id) {
    await product.findByIdAndDelete(id);
}

async function getallproducts() {
    let products = await product.find();
    return products.map(x => x.toObject());
}

async function getproductByID(id) {
    let products = await product.findById(id);
    return products.toObject(); 
}
module.exports = { addProduct, updateproduct, deleteproduct, getallproducts, getproductByID };