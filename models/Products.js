const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    category: String,
    stock: Number,
    image: String,
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
