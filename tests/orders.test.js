const request = require("supertest");
const app = require("../app");

describe("Orders GET routes", () => {
  it("GET /orders should return 401 (protected)", async () => {
    const res = await request(app).get("/orders");
    expect(res.statusCode).toBe(401);
  });
});
