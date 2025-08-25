const express = require('express');
const router = express.Router();
const { addProduct, updateproduct, deleteproduct, getallproducts, getproductByID } = require('../handlers/product-handler');


router.post('/', async (req, res) => {
    model = req.body;
    let newProduct = await addProduct(model);
    res.send(newProduct);
});

router.put('/:id', async (req, res) => {
    let id = req.params['id'];
    let model = req.body;
    await updateproduct(id, model);
    res.send({ message: "Product updated successfully" });
});

router.delete('/:id', async (req, res) => {
    let id = req.params['id'];
    await deleteproduct(id);
    res.send({ message: "Product deleted successfully" });
});

router.get('/', async (req, res) => {
    let products = await getallproducts();  
    res.send(products);
});

router.get('/:id', async (req, res) => {
    let id = req.params['id'];
    let product = await getproductByID(id);
    res.send(product);
});

module.exports = router;