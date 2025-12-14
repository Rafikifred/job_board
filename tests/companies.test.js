const request = require("supertest");
const app = require("../app");

describe("GET /companies", () => {
  it("should return 200", async () => {
    const res = await request(app).get("/companies");
    expect(res.statusCode).toBe(200);
  });
});
