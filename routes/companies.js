const express = require("express");
const router = express.Router();
const Company = require("../models/Companies");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Company management
 */

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Get all companies
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: List of companies
 *       500:
 *         description: Server error
 */
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: Get a company by ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Company found
 *       404:
 *         description: Company not found
 *       500:
 *         description: Server error
 */
router.get("/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: "Invalid company ID" });
  }
});

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Create a new company (Admin only)
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - country
 *               - email
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: Cyusa Ltd
 *               country:
 *                 type: string
 *                 example: Rwanda
 *               email:
 *                 type: string
 *                 example: info@cyusa.com
 *               phone:
 *                 type: string
 *                 example: +250781234567
 *     responses:
 *       201:
 *         description: Company created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", auth, admin, async (req, res) => {
  try {
    const { name, country, email, phone } = req.body;

    if (!name || !country || !email || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const company = await Company.create({ name, country, email, phone });
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     summary: Update a company (Admin only)
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company updated
 *       404:
 *         description: Company not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", auth, admin, async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ error: "Invalid data or ID" });
  }
});

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     summary: Delete a company (Admin only)
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Company deleted
 *       404:
 *         description: Company not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Invalid company ID" });
  }
});

module.exports = router;
