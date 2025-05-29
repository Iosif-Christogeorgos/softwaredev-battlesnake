# 🐍 Battlesnake JavaScript AI – Iteration 4

![Battlesnake Logo](https://media.battlesnake.com/social/StarterSnakeGitHubRepos_JavaScript.png)

A smart AI snake built using the official JavaScript template, extended as part of our university software development project.  
Play it at [play.battlesnake.com](https://play.battlesnake.com).

---

## 📖 About This Project

This Battlesnake uses AI logic to:
- Avoid walls, snakes, and hazards
- Target the closest food using Manhattan distance
- Navigate safely using flood fill
- Avoid dangerous head-to-head collisions
- Soon: **Hunt and kill smaller snakes**

The project is developed incrementally using **Test-Driven Development (TDD)** and good engineering practices.

---

## 🚀 Getting Started

### Local Run (or Replit)

1. Clone the repo or open in Replit
2. Install dependencies:

```bash
npm install
```

3. Run the snake:

```bash
node index.js
```

> You’ll see: `Running Battlesnake at http://0.0.0.0:3000`

Use your Replit or localhost URL to register the snake at [play.battlesnake.com](https://play.battlesnake.com).

---

## 🧪 Development & Testing

### Scripts

```bash
npm start         # Run the server
npm test          # Run Jest test suite
npm test -- --coverage   # Run tests with coverage
npm run docs      # Generate JSDoc HTML documentation
npm run lint      # Run ESLint for code style
```

### Code Quality

- ✅ Written using **TDD** (Jest)
- ✅ Static analysis via **ESLint**
- ✅ Formatted via **Prettier**
- ✅ Version controlled & tagged (e.g. `v1.2.0`)
- ✅ JSDoc used for internal API documentation

---

## 📄 Documentation

Generate and view your own HTML docs from source code:

```bash
npm run docs
```

> Output is saved in the `/docs` folder.  
> Open `docs/index.html` in a browser to view.

---

## 🔄 GitHub Integration

- ✅ GitHub Actions: test, lint, coverage, deploy (Railway)
- ✅ Dependabot enabled for automated security updates
- ✅ Project board tracks issues, tasks, and versions

---

## 📦 Tech Stack

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
- [JSDoc](https://jsdoc.app/)
- [Railway](https://railway.app/) (deployment)

---

## 🧑‍💻 Team

Developed by:  
- Iosif Christogeorgos  
- Mihai-viorel Popescu  
- Georgios Kokkinos  

For the CCS2430 course at **Athens Tech College**

---

## 📝 License

Based on the official Battlesnake starter repo.  
Licensed under the MIT License.

---
