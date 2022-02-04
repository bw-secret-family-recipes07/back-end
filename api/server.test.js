const request = require("supertest");
const server = require("./server.js");
const db = require("./data/db-config");
const Item = require("./items/items-model");

const item1 = {
  item_name: "peace",
  source: "tia",
  ingredients: "beans rice",
  instructions: "cook with patience",
  category: "dinner",
  user_id: 1,
};

const item2 = {
  item_name: "love",
  source: "grandmama",
  ingredients: "maduros y queso",
  instructions: "cook with patience",
  category: "breakfast",
  user_id: 1,
};

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

describe("Basic Tests", () => {



it("sanity check", () => {
  expect(true).not.toBe(false);
});

  it("On the correct Testing env node", async () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });
})

describe("End Point Tests", () => {
  test("Returns 200", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "John", password: "Wick" });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Great to have you, John");
  });
  test("Login returns 200", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "John", password: "Wick" });
    expect(res.status).toBe(200);
  });
  test("Get items", async () => {
    const res = await request(server)
    .post("/api/auth/login")
    .send({ username: "John", password: "Wick" });


    const token = res.body.token;

    const res2 = await request(server)
    .get("/api/items")
    .set('Authorization', token)
    expect(res2.status).toBe(200);
  })
});

