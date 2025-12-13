const express = require("express");
const router = express.Router();
const Company = require("../models/Companies");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Company management (Admin only)
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
 */
router.get("/", async (req, res, next) => {
  try {
    res.json(await Company.find());
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: Get company by ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Company found
 *       404:
 *         description: Company not found
 */
router.get("/:id", async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ error: "Not found" });
    res.json(company);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Create a company (Admin only)
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       201:
 *         description: Company created
 */
router.post("/", auth, admin, async (req, res, next) => {
  try {
    res.status(201).json(await Company.create(req.body));
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     summary: Update company (Admin only)
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", auth, admin, async (req, res, next) => {
  try {
    res.json(await Company.findByIdAndUpdate(req.params.id, req.body, { new: true }));
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     summary: Delete company (Admin only)
 *     tags: [Companies]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", auth, admin, async (req, res, next) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.json({ message: "Company deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       required:
 *         - name
 *         - country
 *       properties:
 *         name:
 *           type: string
 *         country:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 */
