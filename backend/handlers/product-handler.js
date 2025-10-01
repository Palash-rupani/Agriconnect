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

async function getProductsByListing(searchterm, categoryID, page, pagesize, sortby, sortorder,brandID) {
    if (!sortby) {
        sortby = 'price';
    }
    if (!sortorder) {
        sortorder = -1;
    }

    let filter = {};

if (searchterm) {
    filter.$or = [
        { name: { $regex: "\\b" + searchterm + "\\b", $options: "i" } },
        { description: { $regex: ".*" + searchterm + ".*", $options: "i" } }
    ];
}


    if (categoryID) {
        filter.categoryID = categoryID;
    }

    if (brandID) {
        filter.brandID = brandID;
    }

    const products = await product.find(filter)
        .sort({ [sortby]: sortorder })  // dynamic sort field
        .skip((page - 1) * pagesize)
        .limit(pagesize);

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
    ,getProductsByListing
};
