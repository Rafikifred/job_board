const Product = require("./models/Product");

// GET ALL PRODUCTS
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// GET SINGLE PRODUCT
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (err) {
    next(err);
  }
};

// CREATE PRODUCT (ADMIN)
exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, category, stock, description } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "Name and price required" });
    }

    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// UPDATE PRODUCT (ADMIN)
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product)
      return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (err) {
    next(err);
  }
};

// DELETE PRODUCT (ADMIN)
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};
