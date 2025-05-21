const runServer = require("./server");

function info() {
  console.log("INFO");
  return {
    apiversion: "1",
    author: "sifis",
    color: "#ebcf34",
    head: "default",
    tail: "default",
  };
}

function start(gameState) {
  console.log("GAME START");
}

function end(gameState) {
  console.log("GAME OVER\n");
}

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

function getNextCoord(position, move) {
  let { x, y } = position;
  if (move === "up") y += 1;
  if (move === "down") y -= 1;
  if (move === "left") x -= 1;
  if (move === "right") x += 1;
  return { x, y };
}

// ✅ Only run server if not imported by a test
if (require.main === module) {
  runServer({ info, start, move, end });
}

// ✅ Export move() so Jest can test it
module.exports = { move };

function floodFill(start, gameState) {
const visited = new Set();
const stack = [start];
const width = gameState.board.width;
const height = gameState.board.height;

const occupied = new Set(
gameState.board.snakes.flatMap(snake =>
snake.body.map(p => `${p.x},${p.y}`)
)
);

while (stack.length > 0) {
const { x, y } = stack.pop();
const key = `${x},${y}`;

if (
x < 0 || y < 0 || x >= width || y >= height ||
visited.has(key) ||
occupied.has(key)
) continue;

visited.add(key);

stack.push({ x: x + 1, y });
stack.push({ x: x - 1, y });
stack.push({ x, y: y + 1 });
stack.push({ x, y: y - 1 });
}

return visited.size;
}

module.exports = { move, floodFill };