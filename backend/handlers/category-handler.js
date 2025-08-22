const category= require('../db/category')

async function addCategory(model) {
    let newcategory = new category({
        name: model.name,
    });
    await newcategory.save();
    return newcategory.toObject();
}
async function getCategory() {
    let categories = await category.find();
    return categories.map(cat => cat.toObject());
}
async function getCategoryByID(id) {
    let categories = await category.findById(id);
    return categories.toObject();
}
async function updateCategory(id, model) {
    await category.findOneAndUpdate({ _id: id},model);
    return ;
}


async function deleteCategory(id) {
    await category.findByIdAndDelete(id);
    return ;
}


module.exports = {addCategory,updateCategory,deleteCategory, getCategory,getCategoryByID};