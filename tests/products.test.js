const request = require("supertest");
const app = require("../server");

describe("GET /products", () => {
  it("should return all products", async () => {
    const res = await request(app).get("/products");
    expect(res.statusCode).toBe(200);
  });
});
