# Battlesnake JavaScript Starter Project

![Battlesnake Logo](https://media.battlesnake.com/social/StarterSnakeGitHubRepos_JavaScript.png)

An official Battlesnake template written in JavaScript, extended and customized as part of a university project.  
Play it at [play.battlesnake.com](https://play.battlesnake.com).

---

## 🐍 About This Project

This Battlesnake is designed to make intelligent movement decisions using basic AI strategies such as:

- Collision avoidance (walls, itself, and other snakes)
- Flood fill algorithm to evaluate safe regions
- Manhattan distance to locate the closest food
- Basic head-to-head evaluation logic

We’ve implemented these features iteratively with clean code practices and test-driven development (TDD) using Jest.

---

## 🚀 Getting Started

### Run Your Battlesnake Locally

1. Clone this repo.
2. Run:
   ```bash
   npm install
   npm start
   ```
3. Use your `repl.co` or localhost URL to register the snake at [play.battlesnake.com](https://play.battlesnake.com).

---

## 🛠️ Features Implemented

✅ Avoids walls  
✅ Avoids own body  
✅ Avoids other snakes  
✅ Can move into a snake's tail if safe  
✅ Flood fill algorithm to evaluate safest path  
✅ Eats closest food using Manhattan distance  
✅ Starts supporting head-to-head situations  
✅ Written using TDD with Jest  
✅ Code linted with ESLint and formatted with Prettier  
✅ Configured `.editorconfig`  
✅ Versioned and tagged (`v1.0.0`)

---

## 🧪 Development

### Scripts

```bash
npm start        # Starts the server
npm test         # Runs unit tests using Jest
npm run lint     # Runs ESLint
```

### Linting & Formatting

- ESLint: uses `eslint-plugin-sonarjs`, `unicorn`, `eslint-config-prettier`, and `eslint-plugin-eslint-comments`
- Prettier: default formatting rules
- EditorConfig: included for consistent editor settings

---

## 📦 Tech Stack

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

---

## 🧑‍💻 Team

Developed by [Iosif Christogeorgos, Mihai-viorel popescu, Georgios Kokkinos],  
As part of the CCS2430 course at Athens Tech College.

---

## 📈 Project Board and Workflow

Project planning and tracking is done via our [GitHub Project Board](https://github.com/users/Iosif-Christogeorgos/projects/1).

---

## 📄 License

This project is based on the official Battlesnake Starter Project under the MIT License.
