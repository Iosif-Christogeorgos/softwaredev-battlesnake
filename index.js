import runServer from "./server.js";

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
var test = 1;
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

  // Prevent moving backwards into neck
  if (myNeck.x < myHead.x) isMoveSafe.left = false;
  else if (myNeck.x > myHead.x) isMoveSafe.right = false;
  else if (myNeck.y < myHead.y) isMoveSafe.down = false;
  else if (myNeck.y > myHead.y) isMoveSafe.up = false;

  // Prevent moving out of bounds
  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;

  if (myHead.x === 0) isMoveSafe.left = false;
  if (myHead.x === boardWidth - 1) isMoveSafe.right = false;
  if (myHead.y === 0) isMoveSafe.down = false;
  if (myHead.y === boardHeight - 1) isMoveSafe.up = false;

  // Avoid self collision
  const myBody = gameState.you.body;
  for (const move in isMoveSafe) {
    if (!isMoveSafe[move]) continue;

    const nextPos = getNextCoord(myHead, move);
    if (myBody.some((part) => part.x === nextPos.x && part.y === nextPos.y)) {
      isMoveSafe[move] = false;
    }
  }

  // Avoid other snakes
  const enemies = gameState.board.snakes;
  for (const move in isMoveSafe) {
    if (!isMoveSafe[move]) continue;

    const nextPos = getNextCoord(myHead, move);
    for (const snake of enemies) {
      for (const segment of snake.body) {
        if (segment.x === nextPos.x && segment.y === nextPos.y) {
          isMoveSafe[move] = false;
        }
      }
    }
  }

  // Avoid head-to-head collisions
  const myLength = gameState.you.length;

  for (const snake of enemies) {
    if (snake.id === gameState.you.id) continue; // Skip yourself

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

  // Basic food targeting
  const food = gameState.board.food;
  let nextMove = null;

  const safeMoves = Object.keys(isMoveSafe).filter((move) => isMoveSafe[move]);
  if (safeMoves.length === 0) {
    console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
    return { move: "down" };
  }

  if (food.length > 0) {
    const target = food[0];
    let minDist = Infinity;

    for (const move of safeMoves) {
      const newPos = getNextCoord(myHead, move);
      const dist =
        Math.abs(newPos.x - target.x) + Math.abs(newPos.y - target.y);
      if (dist < minDist) {
        minDist = dist;
        nextMove = move;
      }
    }
  }

  if (!nextMove) {
    nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
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

runServer({
  info: info,
  start: start,
  move: move,
  end: end,
});
