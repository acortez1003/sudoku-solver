# Sudoku Solver

A web-based Sudoku Solver app built with React and Vite that lets you:
- Generate Sudoku puzzles to utilize the solve tool
- Automatically solve user-inputted puzzles
- Step-by-step hints to help solve puzzles

## Features

- **Puzzle Generator**: Quickly generate a new Sudoku puzzle  
- **Conflict Detection**: Highlights any conflicts while entering or editing puzzles  
- **Solver**: Instantly solves a valid puzzle
- **Hints**: Step-by-step hints to guide solving (e.g., naked/hidden pairs)

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
### Running locally
```bash
npm run dev
```
And open http://localhost:5173 in your browser.

## Project Structure
```bash
sudoku-solver/
├── public/
├── src/
│   ├── components/
│   │   ├── HintBox.jsx
│   │   ├── NumberPad.jsx
│   │   └── SudokuBoard.jsx
│   ├── styles/
│   │   ├── HintBox.css
│   │   ├── NumberPad.css
│   │   └── SudokuBoard.css
│   └── utils/
│       ├── generator.js
│       ├── hints.js
│       ├── pencilMarks.js
│       └── solver.js
├── App.jsx
├── main.jsx
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```
