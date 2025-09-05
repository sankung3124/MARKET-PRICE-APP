import Product from "../models/product.js";

export async function addProduct(req, res) {
  try {
    const { name, category, currentPrice, vendor } = req.body;
    if (!name || !category || !currentPrice)
      return res.status(400).json({
        success: false,
        message: "Name, category, and current price are required",
      });

    const product = new Product({
      name,
      category,
      currentPrice,
      vendor,
    });
    await product.save();
    res.status(201).json({
      success: true,
      message: "product added successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while adding product",
      error: error.message,
    });
  }
}

export async function getProducts(req, res) {
  try {
    const { category, sort, limit = 20, page = 1 } = req.query; // query params
    let filter = {};
    if (category) filter.category = category;

    const products = await Product.find(filter)
      .sort(sort ? { [sort]: 1 } : {})
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(products);
  } catch (error) {
    res.json({ message: error.message });
  }
}

export async function getProduct(req, res) {
  try {
    const { id } = req.params;
    const oneProduct = await Product.findById(id);
    if (!oneProduct)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json(oneProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const deletedProduct = Product.findByIdAndDelete(id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function searchProducts(req, res) {
  try {
    const {
      q,
      category,
      minPrice,
      maxPrice,
      sort,
      limit = 20,
      page = 1,
    } = req.query;
    let filter = {};
    if (q) filter.$or = [{ name: { $regex: q, $options: "i" } }];
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.currentPrice = {};
      if (minPrice) filter.currentPrice.$gte = Number(minPrice);
      if (maxPrice) filter.currentPrice.$lte = Number(maxPrice);
    }
  } catch (error) {}
}
