export const findHints = (grid, pencilMarks) => {
  // === STRATEGY 1: Naked Single ===
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const id = `${row}-${col}`;
      const value = grid[row][col];
      if (value === '' && pencilMarks[id] && pencilMarks[id].length === 1) {
        return [{
          strategy: 'Naked Single',
          cell: id,
          number: pencilMarks[id][0],
          message: `Naked Single: Cell (${col + 1}, ${row + 1}) can only be ${pencilMarks[id][0]}`
        }];
      }
    }
  }

  // === STRATEGY 2: Hidden Single ===
  const units = getAllUnits();
  for (const unit of units) {
    const numToCells = {};
    for (let num = 1; num <= 9; num++) numToCells[num] = [];

    for (const id of unit) {
      if (gridCell(grid, id) !== '') continue;
      const marks = pencilMarks[id];
      if (!marks) continue;
      for (const num of marks) {
        numToCells[num].push(id);
      }
    }

    for (let num = 1; num <= 9; num++) {
      if (numToCells[num].length === 1) {
        const onlyCell = numToCells[num][0];
        return [{
          strategy: 'Hidden Single',
          cell: onlyCell,
          number: num,
          message: `Hidden Single: Cell ${onlyCell} is the only cell in the unit that can be ${num}`
        }];
      }
    }
  }

    // === STRATEGY 3: Naked Pair ===
    for (const unit of units) {
    const pairMap = {};
    for (const id of unit) {
        const marks = pencilMarks[id];
        if (marks && marks.length === 2) {
        const key = marks.slice().sort().join('');
        if (!pairMap[key]) pairMap[key] = [];
        pairMap[key].push(id);
        }
    }

    for (const [pairKey, cells] of Object.entries(pairMap)) {
        if (cells.length === 2) {
        const pairNums = pairKey.split('').map(Number);
        const eliminatedFrom = [];

        for (const id of unit) {
            if (!cells.includes(id) && pencilMarks[id]) {
            const before = pencilMarks[id].slice();
            const after = before.filter(n => !pairNums.includes(n));
            if (before.length !== after.length) {
                eliminatedFrom.push(id);
            }
            }
        }

        if (eliminatedFrom.length > 0) {
            return [{
            strategy: 'Naked Pair',
            cell: cells[0],
            number: null,
            relatedCells: cells,
            numbers: pairNums,
            eliminatedNumbers: allOtherNumbers(pairNums),
            eliminatedFrom,
            message: `Naked Pair: Cells ${cells.join(' and ')} contain only ${pairNums.join(', ')} — eliminate from others in unit`
            }];
        }
        }
    }
    }

    // === STRATEGY 4: Hidden Pair ===
    for (const unit of units) {
    const numToCells = {};
    for (let num = 1; num <= 9; num++) numToCells[num] = [];

    for (const id of unit) {
        const marks = pencilMarks[id];
        if (!marks) continue;
        for (const num of marks) {
        numToCells[num].push(id);
        }
    }

    for (let a = 1; a <= 8; a++) {
        for (let b = a + 1; b <= 9; b++) {
        const cellsA = numToCells[a];
        const cellsB = numToCells[b];

        if (cellsA.length === 2 && cellsB.length === 2 &&
            cellsA[0] === cellsB[0] && cellsA[1] === cellsB[1]) {
            const targetCells = cellsA;
            const eliminatedFrom = [];

            for (const id of targetCells) {
            const before = pencilMarks[id];
            const after = before.filter(n => n === a || n === b);
            if (before.length !== after.length) {
                eliminatedFrom.push(id);
            }
            }

            if (eliminatedFrom.length > 0) {
            return [{
                strategy: 'Hidden Pair',
                cell: targetCells[0],
                number: null,
                relatedCells: targetCells,
                numbers: [a, b],
                eliminatedNumbers: allOtherNumbers(pairNums),
                eliminatedFrom,
                message: `Hidden Pair: Only cells ${targetCells.join(' and ')} can contain ${a}, ${b} — eliminate other candidates from those cells`
            }];
            }
        }
        }
    }
    }

  return [];
};

function getAllUnits() {
  const units = [];

  // row
  for (let r = 0; r < 9; r++) {
    const row = [];
    for (let c = 0; c < 9; c++) row.push(`${r}-${c}`);
    units.push(row);
  }

  // column
  for (let c = 0; c < 9; c++) {
    const col = [];
    for (let r = 0; r < 9; r++) col.push(`${r}-${c}`);
    units.push(col);
  }

  // box
  for (let br = 0; br < 3; br++) {
    for (let bc = 0; bc < 3; bc++) {
      const box = [];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          box.push(`${3 * br + r}-${3 * bc + c}`);
        }
      }
      units.push(box);
    }
  }

  return units;
}

function gridCell(grid, id) {
  const [r, c] = id.split('-').map(Number);
  return grid[r][c];
}

function allOtherNumbers(keep) {
  return Array.from({ length: 9 }, (_, i) => i + 1).filter(n => !keep.includes(n));
}
