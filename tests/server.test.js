const request = require("supertest");
const createServer = require("../server");

const handlers = {
  info: () => ({ apiversion: "1", author: "test" }),
  start: jest.fn(),
  move: jest.fn(() => ({ move: "up" })),
  end: jest.fn(),
};

let app;

beforeAll(() => {
  app = createServer(handlers);
});

describe("Server routes", () => {
  test("GET / returns info", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("apiversion", "1");
  });

  test("POST /start triggers start", async () => {
    const data = { game: { id: "1" } };
    const res = await request(app).post("/start").send(data);
    expect(res.statusCode).toBe(200);
    expect(handlers.start).toHaveBeenCalledWith(data);
  });

  test("POST /move returns move", async () => {
    const res = await request(app).post("/move").send({ board: {}, you: {} });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ move: "up" });
  });

  test("POST /end triggers end", async () => {
    const data = { game: { id: "1" } };
    const res = await request(app).post("/end").send(data);
    expect(res.statusCode).toBe(200);
    expect(handlers.end).toHaveBeenCalledWith(data);
  });
});
