# 🌌 Turing's Enigma: The Solstice Protocol

[![Game Jam Entry](https://img.shields.io/badge/Game_Jam-June_Solstice-ffa500?style=for-the-badge)](https://dev.to/challenges/june-game-jam-2026-06-03)
[![Framework](https://img.shields.io/badge/Phaser-v3.60-00d2ff?style=for-the-badge&logo=phaser)](https://phaser.io)
[![UI Library](https://img.shields.io/badge/React-18.x-61dafb?style=for-the-badge&logo=react)](https://react.dev)

A cyber-retro, pixel-powered architectural platformer and puzzle-hacking game built natively using **React** and the **Phaser 3 Arcade Physics Engine**. 

Tasked with saving the core system tapes, you must journey deep into the architecture of Bletchley Park’s computing core, intercept runtime glitches, and break the shifting code logic patterns across 8 distinct architectural sectors. 

Happy Birthday, Alan Turing! Built for the DEV June Solstice Game Jam.

---

## 🎮 Gameplay & Control Schematics

Navigate through security grids, manipulate the logic state of your data projectiles, and override terminal arrays.

| Action Key | System Instruction Matrix |
| :--- | :--- |
| <kbd>A</kbd> / <kbd>D</kbd> | Move horizontal node left and right |
| <kbd>W</kbd> | Jump or scale architecture platforms |
| <kbd>Z</kbd> | Toggle binary code tape stream state between `[ 0 ]` (Cyan) and `[ 1 ]` (Orange) |
| <kbd>SPACE</kbd> | Fire targeted decryption code matrices |
| <kbd>E</kbd> | Interface directly with the physical **Turing Bombe** terminal mainframe |

---

## 🔁 Core Loop Protocol

Each architectural sector runs on a two-tier operational state machine:

1. **Phase 1: Training Matrix Initialization** Approach the Turing Bombe terminal and press <kbd>E</kbd> to access the local data layer. Crack the core computer science question (covering Arrays, Search Algorithms, Sorting Complexity, Linked Lists, Stacks, Queues, Binary Trees, and the Halting Problem).
   
2. **Phase 2: Glitch Containment Invasion** Correctly solving the training code flashes a `TRAINING DATA CRACKED` alert. The terminal locks down and releases system-wide **glitch anomalies**. Purge them completely using your blaster. *Note: Enemies are color-coded to correspond to the Z-toggle tape state logic!*
   
3. **Phase 3: Sector Decryption Override** Once all anomalies are destroyed, return right back to the terminal mainframe and press <kbd>E</kbd> again to solve the final **Mission Matrix**. Succeeding will dynamically rebuild the geometry of the game map, changing background environments and advancing you into the next sector!

---

## 🛠️ Architecture & Tech Stack Details

* **Dynamic Map Geometry Deconstruction:** Rather than relying on simple static scenes, the game uses a customized procedurally shifting build loop (`buildLevelMap()`). Advancing sectors completely wipes out the previous physical matrix and dynamically renders new, platform configurations and shifting backdrop colors across all 8 progressive levels.
* **State Shield Locks:** Features safe frame-isolation locks (`this.transitioning`) to prevent lingering calculation hits, physics glitches, or collision overflows on moving frame steps during sector generation.
* **Hybrid HTML5 DOM Elements:** Seamlessly binds responsive text-input elements directly into Phaser's hardware-accelerated WebGL canvas framework for seamless keyboard focus capturing and blur management.

---

## 🚀 Local Installation

Follow these quick commands to spin up the local development engine:

### 1. Clone the Source Repository
```bash
git clone https://github.com/csm-18/TikTikBoom
cd TikTikBoom
```

### 2. Install Dependencies
Install the required npm packages using Node Package Manager:
```bash
npm install
```

### 3. Start Development Server
Launch the local development server with hot module reloading:
```bash
npm run dev
```

The game will open in your browser at `http://localhost:5173` (or the next available port if 5173 is in use).

### 4. Build for Production
To generate an optimized production build:
```bash
npm run build
```

The compiled assets will be output to the `dist/` directory, ready for deployment.

---

## 🎮 Getting Started

1. **Open the Game** – Navigate to `http://localhost:5173` in your web browser.
2. **Read the Control Guide** – Familiarize yourself with the keyboard control scheme above.
3. **Start Training** – Press ENTER or click START on the boot screen to begin Level 1.
4. **Solve & Progress** – Complete each training puzzle, defeat the glitch anomalies, solve the mission matrix, and advance to the next sector.

---

## 📋 Requirements

- **Node.js** v16+ 
- **npm** v8+
- Modern web browser with WebGL support (Chrome, Firefox, Safari, Edge)

---

## 📚 Core Technologies

- **Phaser 3.60** – 2D physics engine and game loop
- **React 18.x** – UI wrapper and component integration
- **Vite** – Ultra-fast build tool and dev server
- **JavaScript/JSX** – Game logic and presentation layer

---

## 🏆 Game Jam Credits

Built as an entry for the **DEV June Solstice Game Jam 2026**, celebrating Alan Turing's legacy.

Enjoy breaking the code! 🔐