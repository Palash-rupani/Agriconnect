const product = require('../db/product');

async function addProduct(model) {
    const newProduct = new product(model);
    await newProduct.save();
    return newProduct.toObject();
}

async function updateproduct(id, model) {
    const updated = await product.findByIdAndUpdate(id, model, { new: true });
    return updated ? updated.toObject() : null;
}

async function deleteproduct(id) {
    const deleted = await product.findByIdAndDelete(id);
    return deleted ? deleted.toObject() : null;
}

async function getallproducts() {
    const products = await product.find();
    return products.map(x => x.toObject());
}

async function getproductByID(id) {
    const found = await product.findById(id);
    return found ? found.toObject() : null;
}

async function getnewproducts() {
    const products = await product.find({ isnew: true }).limit(10);
    return products.map(x => x.toObject());
}

async function getfeaturedproducts() {
    const products = await product.find({ isfeatured: true });
    console.log("Featured products from DB:", products); // 👈 debug log
    return products.map(x => x.toObject());
}


module.exports = { 
    addProduct, 
    updateproduct, 
    deleteproduct, 
    getallproducts, 
    getproductByID, 
    getnewproducts, 
    getfeaturedproducts 
};
