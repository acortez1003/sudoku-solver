# Sudoku Solver

A web-based Sudoku Solver app built with React and Vite that lets you: - Generate Sudoku puzzles to utilize the solve tool - Automatically solve user inputted puzzles - (Future) Step-by-step hints to help solve puzzles

## Features

    - Puzzle Generator: Quickly generate a new Sudoku puzzle
    - Conflict Detection: While entering or editing generated puzzle, the app highlights any conflicts on the grid
    - Solver: Solves automatically

## Planned Features

    - Step-by-step hints to guide solving (hidden/naked pair detection, etc.)

## Getting Started

### Prerequisites

    - Node.js
    - npm or yarn

### Installation

```bash
git clone https://github.com/your-username/sudoku-solver.git
cd sudoku-solver
npm install
```

### Running Locally

`npm run dev`
Open http://localhost:5173 in your browser to see the app.

## Project Structure

sudoku-solver/
├── public/
├── src/
│ ├── components/
│ │ ├── NumberPad.jsx
│ │ └── SudokuBoard.jsx
│ ├── styles/
│ │ ├── NumberPad.css
│ │ └── SudokuBoard.css
│ └── utils/
│ ├── generator.js
│ └── solver.js
├── App.jsx
├── main.jsx
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
