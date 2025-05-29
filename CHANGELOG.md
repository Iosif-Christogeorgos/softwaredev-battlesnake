📜 CHANGELOG  
All notable changes to this Battlesnake project will be documented here.

---

## [1.2.0] - Iteration 4 (Week 14)

🚀 Minor release with improved intelligence and automation

✨ Added

- JSDoc comments for `index.js` functions
- GitHub Actions for tests, linting, coverage, and deploy
- Dependabot for weekly security updates

🧠 Improved

- Snake decision-making logic: better food targeting and head-to-head avoidance
- `move()` logic now includes area control via `floodFill`
- Increased and enforced test coverage (all categories at or above 50%)

🔧 Fixed

- `server.test.js` and coverage edge cases
- Export issues in `index.js` to enable full testing

---

## [1.1.0] - Iteration 3 Final Release (Week 11)

🚀 Minor release with all major features completed

- Flood fill algorithm implemented and integrated
- Test coverage exceeds 50% and enforced via thresholds
- Jest test suite established for core logic and API routes
- Hotfix customization applied and verified

---

## [1.0.0] - Iteration 2 (Week 6–8)

[🔗 View GitHub Release](https://github.com/Iosif-Christogeorgos/softwaredev-battlesnake/releases/tag/V1.0.0)

✨ Added

- Pull Request Template (.github/PULL_REQUEST_TEMPLATE.md)
- Food targeting using Manhattan distance
- Logic to avoid head-to-head collisions with stronger snakes
- ESLint setup and auto-fix on save

🔧 Configured

- ESLint with default rules
- Prettier with VS Code format on save
- Git settings.json to format and fix on save

---

## [0.1.0] - Iteration 1 (Week 4–6)

✨ Added

- Snake appearance customization (color, head, tail)
- Wall collision avoidance
- Self-collision avoidance
- Enemy snake collision avoidance
