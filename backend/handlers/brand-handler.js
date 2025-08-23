const Brand = require('../db/brand');

async function addBrand(model) {
    let newbrand = new Brand({
        name: model.name,
    });
    await newbrand.save();
    return newbrand.toObject();
}
async function getbrand() {
    let brand = await Brand.find();
    return brand.map(cat => cat.toObject());
}
async function getbrandByID(id) {
    let brand = await Brand.findById(id);
    return brand.toObject();
}
async function updatebrand(id, model) {
    await Brand.findOneAndUpdate({ _id: id},model);
    return ;
}
async function deletebrand(id) {
    await Brand.findByIdAndDelete(id);
    return ;
}
module.exports = {addBrand,updatebrand,deletebrand, getbrand,getbrandByID};