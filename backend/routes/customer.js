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
  getfeaturedproducts,
  getProductsByListing
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

router.get('/products', async (req, res) => {
  let { searchterm, categoryID, sortby, sortorder, brandID } = req.query;

  // sanitize invalid values
  if (categoryID === 'undefined') categoryID = undefined;
  if (brandID === 'undefined') brandID = undefined;
  if (sortby === 'undefined') sortby = undefined;

  sortorder = sortorder ? parseInt(sortorder) : -1;

  try {
    const products = await getProductsByListing(searchterm, categoryID, sortby, sortorder, brandID);
    res.send(products);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});


router.get('/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getproductByID(id);

    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    res.send(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send({ message: 'Server error' });
  }
});



module.exports = router;
