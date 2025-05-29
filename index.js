const createServer = require("./server");

/**
 * Returns basic Battlesnake customization info.
 * @returns {Object} Snake appearance and metadata.
 */
function info() {
  console.log("INFO");
  return {
    apiversion: "1",
    author: "sifis",
    color: "#FF5733",
    head: "nr-rocket",
    tail: "coffee",
  };
}

/**
 * Called when a new game starts.
 * @param {Object} gameState - The initial game state.
 */
function start(gameState) {
  console.log("GAME START");
}

/**
 * Called when the game ends.
 * @param {Object} gameState - The final game state.
 */
function end(gameState) {
  console.log("GAME OVER\n");
}

/**
 * Main move decision logic.
 * @param {Object} gameState - The current game state.
 * @returns {Object} The next move (e.g., { move: "up" }).
 */
function move(gameState) {
  let isMoveSafe = {
    up: true,
    down: true,
    left: true,
    right: true,
  };

  const myHead = gameState.you.body[0];
  const myNeck = gameState.you.body[1];
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;
  const myBody = gameState.you.body;
  const enemies = gameState.board.snakes;
  const food = gameState.board.food;

  if (myNeck.x < myHead.x) isMoveSafe.left = false;
  else if (myNeck.x > myHead.x) isMoveSafe.right = false;
  else if (myNeck.y < myHead.y) isMoveSafe.down = false;
  else if (myNeck.y > myHead.y) isMoveSafe.up = false;

  if (myHead.x === 0) isMoveSafe.left = false;
  if (myHead.x === boardWidth - 1) isMoveSafe.right = false;
  if (myHead.y === 0) isMoveSafe.down = false;
  if (myHead.y === boardHeight - 1) isMoveSafe.up = false;

  for (const move in isMoveSafe) {
    if (!isMoveSafe[move]) continue;
    const nextPos = getNextCoord(myHead, move);
    if (myBody.some((part) => part.x === nextPos.x && part.y === nextPos.y)) {
      isMoveSafe[move] = false;
    }
  }

  function isTail(segment, snake) {
    const tail = snake.body[snake.body.length - 1];
    return segment.x === tail.x && segment.y === tail.y;
  }

  function isEating(snake) {
    return food.some((f) => f.x === snake.head.x && f.y === snake.head.y);
  }

  for (const move in isMoveSafe) {
    if (!isMoveSafe[move]) continue;

    const nextPos = getNextCoord(myHead, move);

    for (const snake of enemies) {
      for (const segment of snake.body) {
        const isEnemyTail = isTail(segment, snake);
        const enemyIsEating = isEating(snake);

        if (
          segment.x === nextPos.x &&
          segment.y === nextPos.y &&
          (!isEnemyTail || enemyIsEating)
        ) {
          isMoveSafe[move] = false;
        }
      }
    }
  }

  const myLength = gameState.you.length;
  for (const snake of enemies) {
    if (snake.id === gameState.you.id) continue;
    const enemyHead = snake.head;
    const enemyLength = snake.length;

    for (const move in isMoveSafe) {
      if (!isMoveSafe[move]) continue;
      const nextPos = getNextCoord(myHead, move);
      const dx = Math.abs(nextPos.x - enemyHead.x);
      const dy = Math.abs(nextPos.y - enemyHead.y);

      if (dx + dy === 1 && enemyLength >= myLength) {
        isMoveSafe[move] = false;
      }
    }
  }

  for (const move in isMoveSafe) {
    if (!isMoveSafe[move]) continue;
    const nextPos = getNextCoord(myHead, move);
    if (
      nextPos.x < 0 ||
      nextPos.y < 0 ||
      nextPos.x >= boardWidth ||
      nextPos.y >= boardHeight
    ) {
      isMoveSafe[move] = false;
    }
  }

  let nextMove = null;
  const safeMoves = Object.keys(isMoveSafe).filter((move) => isMoveSafe[move]);
  if (safeMoves.length === 0) {
    console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
    return { move: "down" };
  }

  // Attempt to hunt smaller snakes
  let killMove = null;

  for (const snake of enemies) {
    if (snake.id === gameState.you.id) continue;

    const enemyHead = snake.head;
    const enemyLength = snake.length;

    if (enemyLength >= myLength) continue;

    for (const move of safeMoves) {
      const nextPos = getNextCoord(myHead, move);
      const dx = Math.abs(nextPos.x - enemyHead.x);
      const dy = Math.abs(nextPos.y - enemyHead.y);

      if (dx + dy === 1) {
        killMove = move;
        break;
      }
    }

    if (killMove) break;
  }

  if (killMove) {
    console.log(
      `MOVE ${gameState.turn}: Hunting smaller snake via ${killMove}`
    );
    return { move: killMove };
  }

  if (food.length > 0) {
    let closestFood = null;
    let minFoodDist = Infinity;

    for (const f of food) {
      const dist = Math.abs(myHead.x - f.x) + Math.abs(myHead.y - f.y);
      if (dist < minFoodDist) {
        minFoodDist = dist;
        closestFood = f;
      }
    }

    let minMoveDist = Infinity;
    for (const move of safeMoves) {
      const newPos = getNextCoord(myHead, move);
      const dist =
        Math.abs(newPos.x - closestFood.x) + Math.abs(newPos.y - closestFood.y);
      if (dist < minMoveDist) {
        minMoveDist = dist;
        nextMove = move;
      }
    }
  }

  if (!nextMove) {
    let maxArea = -1;
    for (const move of safeMoves) {
      const pos = getNextCoord(myHead, move);
      const area = floodFill(pos, gameState);
      if (area > maxArea) {
        maxArea = area;
        nextMove = move;
      }
    }
  }

  console.log(`MOVE ${gameState.turn}: ${nextMove}`);
  return { move: nextMove };
}

/**
 * Returns the new position from a move direction.
 * @param {Object} position - Current coordinates {x, y}
 * @param {string} move - One of: "up", "down", "left", "right"
 * @returns {Object} New position object
 */
function getNextCoord(position, move) {
  let { x, y } = position;
  if (move === "up") y += 1;
  if (move === "down") y -= 1;
  if (move === "left") x -= 1;
  if (move === "right") x += 1;
  return { x, y };
}

/**
 * Flood fill algorithm to calculate free space.
 * @param {Object} start - Starting coordinates {x, y}
 * @param {Object} gameState - Current game state
 * @returns {number} Reachable area size
 */
function floodFill(start, gameState) {
  const visited = new Set();
  const stack = [start];
  const width = gameState.board.width;
  const height = gameState.board.height;

  const occupied = new Set(
    gameState.board.snakes.flatMap((snake) =>
      snake.body.map((p) => `${p.x},${p.y}`)
    )
  );

  while (stack.length > 0) {
    const { x, y } = stack.pop();
    const key = `${x},${y}`;

    if (
      x < 0 ||
      y < 0 ||
      x >= width ||
      y >= height ||
      visited.has(key) ||
      occupied.has(key)
    )
      continue;

    visited.add(key);

    stack.push({ x: x + 1, y });
    stack.push({ x: x - 1, y });
    stack.push({ x, y: y + 1 });
    stack.push({ x, y: y - 1 });
  }

  return visited.size;
}

// ✅ Start server when run directly
if (require.main === module) {
  const app = createServer({ info, start, move, end });
  const host = "0.0.0.0";
  const port = process.env.PORT || 3000;
  app.listen(port, host, () => {
    console.log(`Running Battlesnake at http://${host}:${port}`);
  });
}

// ✅ Export for tests and server
module.exports = { move, floodFill, info, start, end, getNextCoord };
