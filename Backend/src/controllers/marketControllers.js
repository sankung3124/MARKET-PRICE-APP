import Market from "../models/Market.js";
import Product from "../models/product.js";

export async function getMarkets(req, res) {
  try {
    const {
      city,
      page = 1,
      limit = 10,
      sortBy = "name",
      sortOrder = "asc",
    } = req.query;

    let filter = { isActive: true };
    if (city) filter["location.city"] = new RegExp(city, "i");

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    const markets = await Market.find(filter)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Market.countDocuments(filter);
    res.json({
      success: true,
      data: markets,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getMarket = async (req, res) => {
  try {
    const market = await Market.findById(req.params.id);
    if (!market) {
      return res.status(404).json({ message: "Market not found" });
    }
    res.json({ success: true, data: market });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create market (Admin only)
export const createMarket = async (req, res) => {
  try {
    const market = await Market.create(req.body);
    res.status(201).json({ success: true, data: market });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update market (Admin only)
export const updateMarket = async (req, res) => {
  try {
    const market = await Market.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({ success: true, data: market });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMarketProducts = async (req, res) => {
  try {
    const products = await Product.find({
      market: req.params.id,
      isActive: true,
    }).populate("vendor", "name email");

    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
