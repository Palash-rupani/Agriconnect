const category= require('../db/category')

async function addCategory(model) {
    let newcategory = new category({
        name: model.name,
    });
    await newcategory.save();
    return newcategory.toObject();
}

async function updateCategory(id, model) {
    await category.findOneAndUpdate({ _id: id},model);
    return ;
}


async function deleteCategory(id) {
    await category.findByIdAndDelete(id);
    return ;
}


module.exports = {addCategory,updateCategory,deleteCategory};