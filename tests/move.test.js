const { move } = require('../index'); // adjust path if needed

test('Returns a valid move', () => {
  const dummyGameState = {
    game: { id: "test" },
    turn: 1,
    board: {
      height: 11,
      width: 11,
      food: [],
      snakes: []
    },
    you: {
      id: "you",
      health: 100,
      body: [{ x: 5, y: 5 }, { x: 5, y: 4 }]
    }
  };

  const result = move(dummyGameState);
  expect(["up", "down", "left", "right"]).toContain(result.move);
});