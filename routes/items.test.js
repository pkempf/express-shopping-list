process.env.NODE_ENV = "test";
const supertest = require("supertest");
const app = require("../app");

let items = require("../fakeDb");
let item = { name: "test item", price: 3.5 };

beforeEach(async () => {
  items.push(item);
});

afterEach(async () => {
  items = [];
});

describe("GET /items", () => {
  test("Gets a list of all the items", async () => {
    const resp = await supertest(app).get("/items");
    const { items } = resp.body;
    expect(resp.statusCode).toBe(200);
    expect(items).toHaveLength(1);
  });
});

describe("GET /items/:name", () => {
  test("Gets one item", async () => {
    const resp = await supertest(app).get(`/items/${item.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body.item).toEqual(item);
  });

  test("Sends 404 if it can't find the item", async () => {
    const resp = await supertest(app).get("/items/asdfghjkl");
    expect(resp.statusCode).toBe(404);
  });
});

describe("POST /items", () => {
  test("Makes a new item", async () => {
    const resp = await supertest(app).post("/items").send({
      name: "new item",
      price: 42,
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body.item).toHaveProperty("name");
    expect(resp.body.item).toHaveProperty("price");
    expect(resp.body.item.name).toEqual("new item");
    expect(resp.body.item.price).toEqual(42);
  });
});

describe("PATCH /items/:name", () => {
  test("Updates an existing item", async () => {
    const resp = await supertest(app)
      .patch(`/items/${item.name}`)
      .send({ name: "updated item", price: 4.25 });
    expect(resp.statusCode).toBe(200);
    expect(resp.body.item.name).toEqual("updated item");
    expect(resp.body.item.price).toEqual(4.25);
  });

  test("Sends 404 if it can't find the item", async () => {
    const resp = await supertest(app).patch("/items/asdfghjkl");
    expect(resp.statusCode).toBe(404);
  });
});

describe("DELETE /items/:name", () => {
  test("Deletes an existing item", async () => {
    const resp = await supertest(app).delete(`/items/${item.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: `Item "${item.name}" deleted` });
  });
});
