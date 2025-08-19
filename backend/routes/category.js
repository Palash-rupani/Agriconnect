const express= require('express')
const router = express.Router()
const category= require('../db/category');
const { addCategory,updateCategory } = require('../handlers/category-handler');
const { deleteCategory } = require('../handlers/category-handler');
router.post("", async (req, res) => {
    console.log("BODY RECEIVED:", req.body);
    let model = req.body;
    let result= await addCategory(model);
    res.send(result);
})

router.put("/:id", async (req, res) => {
    console.log("BODY RECEIVED:", req.body);
    let model = req.body;
    let id = req.params['id'];
    let result =await updateCategory(id, model);
    res.send({ message: "Category updated successfully" });
})

router.delete("/:id", async (req, res) => {
    let id = req.params['id'];
    await deleteCategory(id);
    res.send({ message: "Category deleted successfully" });
});

module.exports = router;
     