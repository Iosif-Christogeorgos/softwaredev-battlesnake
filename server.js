const express = require("express");

function createServer(handlers) {
  const app = express();
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send(handlers.info());
  });

  app.post("/start", (req, res) => {
    handlers.start(req.body);
    res.send("ok");
  });

  app.post("/move", (req, res) => {
    res.send(handlers.move(req.body));
  });

  app.post("/end", (req, res) => {
    handlers.end(req.body);
    res.send("ok");
  });

  app.use((req, res, next) => {
    res.set("Server", "battlesnake/replit/starter-snake-javascript");
    next();
  });

  return app;
}

// ONLY start server if run directly (not during tests)
if (require.main === module) {
  const handlers = require("./index"); // or wherever your real handlers are
  const app = createServer(handlers);
  const host = "0.0.0.0";
  const port = process.env.PORT || 8000;
  app.listen(port, host, () => {
    console.log(`Running Battlesnake at http://${host}:${port}...`);
  });
}

// ⬇️ EXPORT THE SERVER FACTORY FOR TESTING
module.exports = createServer;
