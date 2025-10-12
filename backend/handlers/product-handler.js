import mongoose from "mongoose";
import product from "../db/product.js"; // note the .js extension!

export async function addProduct(model) {
  const newProduct = new product(model);
  await newProduct.save();
  return newProduct.toObject();
}

export async function updateproduct(id, model) {
  const updated = await product.findByIdAndUpdate(id, model, { new: true });
  return updated ? updated.toObject() : null;
}

export async function deleteproduct(id) {
  const deleted = await product.findByIdAndDelete(id);
  return deleted ? deleted.toObject() : null;
}

export async function getallproducts() {
  const products = await product.find();
  return products.map((x) => x.toObject());
}

export async function getproductByID(id) {
  const found = await product.findById(id);
  return found ? found.toObject() : null;
}

export async function getnewproducts() {
  const products = await product.find({ isnew: true }).limit(10);
  return products.map((x) => x.toObject());
}

export async function getfeaturedproducts() {
  const products = await product.find({ isfeatured: true });
  console.log("Featured products from DB:", products);
  return products.map((x) => x.toObject());
}

export async function getProductsByListing(
  searchterm,
  categoryID,
  sortby,
  sortorder,
  brandID,
  page = 1,
  pagesize = 50
) {
  console.log("🟢 Step 1 - Raw query params received:");
  console.log({ searchterm, categoryID, sortby, sortorder, brandID, page, pagesize });

  // ✅ FIX: sanitize undefined / null / "undefined" values
  if (!searchterm || searchterm === "undefined") searchterm = "";
  if (!categoryID || categoryID === "undefined") categoryID = "";
  if (!brandID || brandID === "undefined") brandID = "";
  if (!sortby || sortby === "undefined") sortby = "";
  if (isNaN(sortorder)) sortorder = 1;

  const filter = {};

  // 🔍 Search filter only if term exists
  if (searchterm.trim() !== "") {
    filter.$or = [
      { name: { $regex: searchterm, $options: "i" } },
      { description: { $regex: searchterm, $options: "i" } },
    ];
  }

  // 🏷️ Category filter
  if (categoryID !== "") {
    if (mongoose.isValidObjectId(categoryID)) {
      filter.categoryID = new mongoose.Types.ObjectId(categoryID);
    } else {
      filter.categoryID = categoryID;
    }
  }

  // 🏭 Brand filter
  if (brandID !== "") {
    if (mongoose.isValidObjectId(brandID)) {
      filter.brandID = new mongoose.Types.ObjectId(brandID);
    } else {
      filter.brandID = brandID;
    }
  }

  // 🔽 Sorting
  const sortObj = {};
  if (sortby !== "") {
    sortObj[sortby] = sortorder && !isNaN(sortorder) ? sortorder : 1;
  }

  console.log("🟡 Step 2 - Final MongoDB filter object:");
  console.log(JSON.stringify(filter, null, 2));
  console.log("🟡 Step 3 - Sort object:");
  console.log(sortObj);

  const skipCount = (page - 1) * pagesize;

  const products = await product
    .find(filter)
    .sort(sortObj)
    .skip(skipCount)
    .limit(pagesize);

  console.log(`🟣 Step 4 - Found ${products.length} products`);
  if (products.length === 0) {
    console.log("⚠️ No products matched your filters.");
  } else {
    console.log("✅ Sample product:", products[0]);
  }

  return products.map((p) => p.toObject());
}

