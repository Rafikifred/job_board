const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const Product = require("../models/Product");
const Company = require("../models/Company");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Product.deleteMany();
  await Company.deleteMany();

  const company = await Company.create({
    name: "Test Company",
    country: "Rwanda",
    email: "test@company.com",
    phone: "0788888888",
  });

  await Product.create({
    name: "Test Product",
    description: "Test description",
    price: 100,
    company: company._id,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /products", () => {
  it("should return all products", async () => {
    const res = await request(app).get("/products");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  }, 10000);
});

describe("GET /products/:id", () => {
  it("should return product by id", async () => {
    const product = await Product.findOne();

    const res = await request(app).get(`/products/${product._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Test Product");
  }, 10000);
});
