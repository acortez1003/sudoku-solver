export function generatePencilMarks(grid) {
  const marks = {};

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === '') {
        const candidates = [];

        for (let num = 1; num <= 9; num++) {
          if (!hasConflict(grid, row, col, num)) {
            candidates.push(num);
          }
        }

        marks[`${row}-${col}`] = candidates;
      }
    }
  }

  return marks;
}

function hasConflict(grid, row, col, number) {
  const val = number.toString();

  // row check
  for (let c = 0; c < 9; c++) {
    if (c !== col && grid[row][c] === val) return true;
  }

  // column check
  for (let r = 0; r < 9; r++) {
    if (r !== row && grid[r][col] === val) return true;
  }

  // box check
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if ((r !== row || c !== col) && grid[r][c] === val) return true;
    }
  }

  return false;
}
