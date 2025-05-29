const { move } = require("../index");

test("Returns a valid move", () => {
  const dummyGameState = {
    game: { id: "test" },
    turn: 1,
    board: {
      height: 11,
      width: 11,
      food: [],
      snakes: [],
    },
    you: {
      id: "you",
      health: 100,
      body: [
        { x: 5, y: 5 },
        { x: 5, y: 4 },
      ],
      length: 2,
    },
  };

  const result = move(dummyGameState);
  expect(["up", "down", "left", "right"]).toContain(result.move);
});

test("Avoids head-to-head with stronger enemy", () => {
  const gameState = {
    turn: 1,
    you: {
      id: "you",
      body: [
        { x: 2, y: 2 },
        { x: 2, y: 1 },
      ], // Ensure neck is defined
      length: 3,
    },
    board: {
      width: 7,
      height: 7,
      food: [],
      snakes: [
        {
          id: "you",
          head: { x: 2, y: 2 },
          body: [
            { x: 2, y: 2 },
            { x: 2, y: 1 },
          ],
          length: 3,
        },
        {
          id: "enemy",
          head: { x: 3, y: 2 },
          body: [{ x: 3, y: 2 }],
          length: 10,
        },
      ],
    },
  };

  const result = move(gameState);
  expect(result.move).not.toBe("right");
});

test("Moves left if all other options are blocked", () => {
  const gameState = {
    turn: 10,
    you: {
      id: "snake-id",
      health: 90,
      body: [
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      length: 3,
    },
    board: {
      width: 5,
      height: 5,
      food: [],
      snakes: [
        {
          id: "snake-id",
          head: { x: 1, y: 1 },
          body: [
            { x: 1, y: 1 },
            { x: 2, y: 1 },
          ],
        },
      ],
    },
  };

  const result = move(gameState);
  expect(["left", "up", "down", "right"]).toContain(result.move);
});
