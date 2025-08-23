const express= require('express')
const router = express.Router()
const Brand= require('../db/brand');
const { addBrand, updatebrand, deletebrand, getbrand, getbrandByID } = require('../handlers/brand-handler');


router.post("", async (req, res) => {
    console.log("BODY RECEIVED:", req.body);
    let model = req.body;
    let result= await addBrand(model);
    res.send(result);
})

router.get("", async (req, res) => {
    let categories = await getbrand();
    res.send(categories);
})

router.get("/:id", async (req, res) => {
    let id = req.params['id'];
    let result = await getbrandByID(id);
    res.send(result);
})

router.put("/:id", async (req, res) => {
    console.log("BODY RECEIVED:", req.body);
    let model = req.body;
    let id = req.params['id'];
    let result =await updatebrand(id, model);
    res.send({ message: "Brand updated successfully" });
})

router.delete("/:id", async (req, res) => {
    let id = req.params['id'];
    await deletebrand(id);
    res.send({ message: "Brand deleted successfully" });
});

module.exports = router;
     