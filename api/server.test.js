const request = require("supertest");
const server = require("./server.js");
const db = require("../api/data/db-config");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

describe("End Point Tests", () => {
  describe("New user registration works", () => {
    test("Returns 200", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: "John", password: "Wick" });
      expect(res.status).toBe(201);
    });
    test("Login Returns 200", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "John", password: "Wick" });
      expect(res.status).toBe(200);
    });
  });
});
