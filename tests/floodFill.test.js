const { floodFill } = require("../index");

test("flood fill counts reachable area", () => {
  const gameState = {
    board: {
      width: 5,
      height: 5,
      snakes: [
        {
          body: [
            { x: 2, y: 2 },
            { x: 2, y: 3 },
            { x: 2, y: 4 }
          ]
        }
      ]
    }
  };

  const start = { x: 0, y: 0 };
  const result = floodFill(start, gameState);

  expect(result).toBeGreaterThan(10); // basic test, you can be more precise
});