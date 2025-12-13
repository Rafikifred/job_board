const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    address: String,
    website: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
