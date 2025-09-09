import Product from "../models/product.js";

export async function addProduct(req, res) {
  try {
    const { name, category, currentPrice, market } = req.body;
    if (!name || !category || !currentPrice || market)
      return res.status(400).json({
        success: false,
        message: "Name, category, and current price are required",
      });

    if (currentPrice <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0",
      });
    }

    const product = new Product({
      name,
      category,
      currentPrice,
      market,
      vendor: req.user.id,
      priceHistory: [{ price: currentPrice, changedBy: req.user.id }],
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
    const deletedProduct = Product.findByIdAndDelete(
      id,
      { isActive: false },
      { new: true }
    );
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
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    const products = await Product.find(filter)
      .populate("vendor", "name email")
      .populate("market", "name location")
      .sort(sortOptions)
      .limit(Number(limit))
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      data: products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalProducts: total,
        resultsCount: products.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Remove fields that shouldn't be updated
    delete updates.vendor;
    delete updates._id;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if price is being updated
    if (updates.currentPrice && updates.currentPrice !== product.currentPrice) {
      product.priceHistory.push({
        price: updates.currentPrice,
        changedBy: req.user.id,
      });
    }

    // Update other fields
    Object.keys(updates).forEach((key) => {
      product[key] = updates[key];
    });

    await product.save();
    await product.populate("vendor", "name email");
    await product.populate("market", "name location");

    res.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export async function getVendorProducts(req, res) {
  try {
    const { page = 1, limit = 20 } = req.query;

    const products = await Product.find({
      vendor: req.user.id,
      isActive: true,
    })
      .populate("market", "name location")
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((page - 1) * limit);

    const total = await Product.countDocuments({
      vendor: req.user.id,
      isActive: true,
    });

    res.json({
      success: true,
      data: products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalProducts: total,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
