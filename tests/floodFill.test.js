const { floodFill } = require("../index");

describe("floodFill", () => {
  test("counts reachable area on an empty board", () => {
    const gameState = {
      board: {
        width: 5,
        height: 5,
        snakes: [], // no obstacles
      },
    };

    const start = { x: 0, y: 0 };
    const result = floodFill(start, gameState);

    expect(result).toBe(25); // entire board reachable
  });

  test("avoids snake bodies", () => {
    const gameState = {
      board: {
        width: 5,
        height: 5,
        snakes: [
          {
            body: [
              { x: 2, y: 2 },
              { x: 2, y: 3 },
              { x: 2, y: 4 },
            ],
          },
        ],
      },
    };

    const start = { x: 0, y: 0 };
    const result = floodFill(start, gameState);

    expect(result).toBeGreaterThan(10); // avoids snake area
    expect(result).toBeLessThan(25); // not full board
  });

  test("returns 0 if start is blocked", () => {
    const gameState = {
      board: {
        width: 5,
        height: 5,
        snakes: [
          {
            body: [{ x: 0, y: 0 }],
          },
        ],
      },
    };

    const start = { x: 0, y: 0 };
    const result = floodFill(start, gameState);

    expect(result).toBe(0); // can't enter occupied space
  });
});
