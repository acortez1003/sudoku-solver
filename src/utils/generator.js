export function createEmptyGrid() {
  return Array.from({ length: 9 }, () => Array(9).fill(''));
}

// if placing num is valid in grid[row][col] check
function isValid(grid, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num || grid[i][col] === num) return false;
  }

  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (grid[r][c] === num) return false;
    }
  }

  return true;
}

// backtracking to fill grid
function fillGrid(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === '') {
        const numbers = shuffleArray(['1','2','3','4','5','6','7','8','9']);
        for (let num of numbers) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (fillGrid(grid)) return true;
            grid[row][col] = '';
          }
        }
        return false;
      }
    }
  }
  return true;
}

// randomly remove `count` cells to make it a puzzle
function removeCells(grid, count = 45) {
  const newGrid = grid.map(row => [...row]);
  let removed = 0;

  while (removed < count) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (newGrid[row][col] !== '') {
      newGrid[row][col] = '';
      removed++;
    }
  }

  return newGrid;
}

// Fisher-Yates shuffle
function shuffleArray(arr) {
  const array = [...arr];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function generateSudoku() {
  const grid = createEmptyGrid();
  fillGrid(grid);
  return removeCells(grid, 45);
}
