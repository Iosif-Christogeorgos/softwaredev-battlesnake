const { info, start, end, move, floodFill } = require("../index");

describe("info()", () => {
  test("returns correct metadata", () => {
    const result = info();
    expect(result).toHaveProperty("apiversion", "1");
    expect(result).toHaveProperty("author", "sifis");
  });
});

describe("start()", () => {
  test("logs start message", () => {
    console.log = jest.fn();
    start({ game: { id: "game-id" } });
    expect(console.log).toHaveBeenCalledWith("GAME START");
  });
});

describe("end()", () => {
  test("logs end message", () => {
    console.log = jest.fn();
    end({ game: { id: "game-id" } });
    expect(console.log).toHaveBeenCalledWith("GAME OVER\n");
  });
});

describe("getNextCoord()", () => {
  const getNextCoord =
    move.__proto__.constructor.prototype.getNextCoord ||
    require("../index").getNextCoord;

  test("returns correct position for up", () => {
    expect(getNextCoord({ x: 2, y: 2 }, "up")).toEqual({ x: 2, y: 3 });
  });

  test("returns correct position for down", () => {
    expect(getNextCoord({ x: 2, y: 2 }, "down")).toEqual({ x: 2, y: 1 });
  });

  test("returns correct position for left", () => {
    expect(getNextCoord({ x: 2, y: 2 }, "left")).toEqual({ x: 1, y: 2 });
  });

  test("returns correct position for right", () => {
    expect(getNextCoord({ x: 2, y: 2 }, "right")).toEqual({ x: 3, y: 2 });
  });
});
