export function solve(grid) {
  const newGrid = grid.map(row => [...row]);

  const isValid = (row, col, num) => {
    // Check row and column
    for (let i = 0; i < 9; i++) {
      if (i !== col && newGrid[row][i] === num) return false;
      if (i !== row && newGrid[i][col] === num) return false;
    }

    // Check 3x3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if ((i !== row || j !== col) && newGrid[i][j] === num) return false;
      }
    }

    return true;
  };

  // Validate existing grid before solving
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const val = newGrid[row][col];
      if (val !== '') {
        newGrid[row][col] = ''; // Temporarily clear to validate properly
        if (!isValid(row, col, val)) {
          return null; // Invalid starting grid
        }
        newGrid[row][col] = val; // Restore
      }
    }
  }

  // Start solving
  const solveRecursive = () => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (newGrid[row][col] === '') {
          for (let num = 1; num <= 9; num++) {
            const strNum = num.toString();
            if (isValid(row, col, strNum)) {
              newGrid[row][col] = strNum;
              if (solveRecursive()) return true;
              newGrid[row][col] = '';
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const success = solveRecursive();
  return success ? newGrid : null;
}
