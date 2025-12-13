const request = require("supertest");
const app = require("../app");

describe("Companies GET routes", () => {
  it("GET /companies should return 200", async () => {
    const res = await request(app).get("/companies");
    expect(res.statusCode).toBe(200);
  });

  it("GET /companies/:id should return 404", async () => {
    const res = await request(app).get("/companies/invalidid");
    expect(res.statusCode).toBe(404);
  });
});
