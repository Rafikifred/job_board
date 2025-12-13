const router = require("express").Router();
const Product = require("../models/Products");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { createProductSchema, updateProductSchema } = require("../validation/productValidation");

router.get("/", async (req, res, next) => {
  try {
    res.json(await Product.find().populate("company"));
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.json(await Product.findById(req.params.id));
  } catch (err) {
    next(err);
  }
});

router.post("/", auth, admin, async (req, res, next) => {
  try {
    const { error } = createProductSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    res.status(201).json(await Product.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.put("/:id", auth, admin, async (req, res, next) => {
  try {
    const { error } = updateProductSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    res.json(await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", auth, admin, async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
