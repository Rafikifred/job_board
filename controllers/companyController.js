const Company = require("./models/Company");

// GET ALL
exports.getCompanies = async (req, res, next) => {
  try {
    res.json(await Company.find());
  } catch (err) {
    next(err);
  }
};

// GET ONE
exports.getCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company)
      return res.status(404).json({ error: "Company not found" });

    res.json(company);
  } catch (err) {
    next(err);
  }
};

// CREATE (ADMIN)
exports.createCompany = async (req, res, next) => {
  try {
    const { name, email, phone, address } = req.body;
    if (!name || !email)
      return res.status(400).json({ error: "Required fields missing" });

    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (err) {
    next(err);
  }
};

// UPDATE (ADMIN)
exports.updateCompany = async (req, res, next) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!company)
      return res.status(404).json({ error: "Company not found" });

    res.json(company);
  } catch (err) {
    next(err);
  }
};

// DELETE (ADMIN)
exports.deleteCompany = async (req, res, next) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company)
      return res.status(404).json({ error: "Company not found" });

    res.json({ message: "Company deleted" });
  } catch (err) {
    next(err);
  }
};
