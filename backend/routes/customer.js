const express = require('express');
const router = express.Router();
const { getCategory } = require('../handlers/category-handler');
const {
  addProduct,
  updateproduct,
  deleteproduct,
  getallproducts,
  getproductByID,
  getnewproducts,
  getfeaturedproducts
} = require('../handlers/product-handler');

// New products
// New products
router.get('/new', async (req, res) => {
  try {
    const products = await getnewproducts();
    res.json(products);
  } catch (err) {
    console.error("Error fetching new products:", err);
    res.status(500).json({ error: err.message });
  }
});

// Featured products
router.get('/featured', async (req, res) => {
  try {
    const products = await getfeaturedproducts();
    res.json(products);
  } catch (err) {
    console.error("Error fetching featured products:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/categories", async (req, res) => {
    let categories = await getCategory();
    res.send(categories);
})

module.exports = router;
