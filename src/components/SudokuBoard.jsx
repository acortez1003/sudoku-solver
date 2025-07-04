import React, { useState, useEffect, useRef } from 'react';
import '../styles/SudokuBoard.css';
import SudokuCell from './SudokuCell';
import NumberPad from './NumberPad';
import HintBox from './HintBox';
import { solve } from '../utils/solver';
import { generateSudoku } from '../utils/generator';
import { generatePencilMarks } from '../utils/pencilMarks';
import { findHints } from '../utils/hints';

const SudokuBoard = () => {
  const [grid, setGrid] = useState(Array(9).fill().map(() => Array(9).fill('')));
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [highlightedCells, setHighlightedCells] = useState(new Set());
  const [conflictCells, setConflictCells] = useState([]);
  const [userInputs, setUserInputs] = useState(new Set());
  const [generatedCells, setGeneratedCells] = useState(new Set());
  const [pencilMarks, setPencilMarks] = useState({});
  const [showHintBox, setShowHintBox] = useState(false);
  const [hints, setHints] = useState([]);
  const [hintIndex, setHintIndex] = useState(0);
  const currentHint = hints[hintIndex] || null;
  const [history, setHistory] = useState([]);
  const skipNextEffect = useRef(false);
  const normalizeGrid = (grid) => grid.map(row => row.map(cell => cell === '' ? '' : cell.toString()));

  const handleClearBoard = () => {
    setGrid(Array(9).fill().map(() => Array(9).fill('')));
    setConflictCells([]);
    setHighlightedCells(new Set());
    setPencilMarks({});
    setUserInputs(new Set());
    setGeneratedCells(new Set());
    setHistory([]);
    setShowHintBox(false);
  };

  const getCellsWithSameValue = (value) => {
    const matches = new Set();
    if (value !== '') {
      grid.forEach((r, rIdx) => {
        r.forEach((cellVal, cIdx) => {
          if (cellVal === value) {
            matches.add(`${rIdx}-${cIdx}`);
          }
        });
      });
    }
    return matches;
  };

  const handleCellClick = (row, col) => {
    const cellId = `${row}-${col}`;
    setSelectedCell(cellId);
    
    const value = grid[row][col];
    setHighlightedCells(getCellsWithSameValue(value));

    if (selectedNumber === null) return;

    const newGrid = grid.map(r => [...r]);
    const newUserInputs = new Set(userInputs);

    // if erase selected
    if (selectedNumber === '') {
      newGrid[row][col] = '';
      newUserInputs.delete(cellId);
      const newGeneratedCells = new Set(generatedCells);
      newGeneratedCells.delete(cellId);
      setGeneratedCells(newGeneratedCells);
    } else {
      const currentValue = newGrid[row][col];
      const newValue = selectedNumber.toString();

      // if selected num is already place, erase
      if (currentValue === newValue) {
        newGrid[row][col] = '';
        newUserInputs.delete(cellId);
      } else {
        newGrid[row][col] = newValue;
        newUserInputs.add(cellId);
      }
    }

    setHistory(prev => [...prev, {
      grid: grid.map(r => [...r]),
      userInputs: new Set(userInputs),
      pencilMarks: JSON.parse(JSON.stringify(pencilMarks)),
    }]);

    setGrid(newGrid);
    setUserInputs(newUserInputs);
    updateConflicts(newGrid, newUserInputs);
    const newValue = newGrid[row][col];
    setHighlightedCells(getCellsWithSameValue(newValue));
  };


  const updateConflicts = (grid, userInputs) => {
    const newConflicts = new Set();

    for (const id of userInputs) {
      const [row, col] = id.split('-').map(Number);
      const value = grid[row][col];
      if (value && hasConflict(grid, row, col, value)) {
        newConflicts.add(id);
      }
    }

    setConflictCells(Array.from(newConflicts));
  };

  const handleNumberClick = (number) => {
    setSelectedNumber(prev => (prev === number ? null : number));
  };

  const hasConflict = (grid, row, col, number) => {
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
  };

  const handleGenerate = () => {
    const puzzle = generateSudoku();
    setGrid(puzzle);
    setConflictCells([]);
    setHighlightedCells(new Set());
    setPencilMarks({});
    setUserInputs(new Set());
    setHistory([]);
    setShowHintBox(false);

    const newGenerated = new Set();
    puzzle.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell !== '') {
          newGenerated.add(`${rowIndex}-${colIndex}`);
        }
      });
    });

    setGeneratedCells(newGenerated);
  };

  const handleSolve = () => {
    setShowHintBox(false);
    if (conflictCells.length > 0) {
      alert('Cannot solve: fix current conflicts first!');
      return;
    }

    const normalizedGrid = normalizeGrid(grid);
    const solvedGrid = solve(normalizedGrid);

    if (solvedGrid) {
      setGrid(solvedGrid);
    } else {
      alert('No solution found.');
    }
  };

  const handleHint = () => {
    if (showHintBox) {
      setShowHintBox(false);
      setPencilMarks({});
      return;
    }

    const numFilledCells = grid.flat().filter(cell => cell !== '').length;
    if (numFilledCells < 10) {
      alert('Please fill at least 10 cells before using a Hint.');
      return;
    }

    if (conflictCells.length > 0) {
      alert('Please fix current conflicts before using a Hint');
      return;
    }

    const marks = generatePencilMarks(grid);
    setPencilMarks(marks);

    const possibleHints = findHints(grid, marks);
    setHints(possibleHints);
    setHintIndex(0);
    setShowHintBox(true);
  };

  const handleApplyHint = () => {
    if (!currentHint) return;

    setHistory(prev => [...prev, {
      grid: grid.map(r => [...r]),
      userInputs: new Set(userInputs),
      pencilMarks: JSON.parse(JSON.stringify(pencilMarks)),
    }]);

    const newGrid = grid.map(r => [...r]);
    const newUserInputs = new Set(userInputs);
    let newPencilMarks = { ...pencilMarks };

    if (currentHint.strategy === 'Naked Single' || currentHint.strategy === 'Hidden Single') {
      const [row, col] = currentHint.cell.split('-').map(Number);
      newGrid[row][col] = currentHint.number.toString();
      newUserInputs.add(currentHint.cell);

      newPencilMarks = generatePencilMarks(newGrid);
    } else if (currentHint.strategy?.includes('Pair')) {
      for (const cellId of currentHint.eliminatedFrom || []) {
        const currentMarks = newPencilMarks[cellId] || [];
        newPencilMarks[cellId] = currentMarks.filter(n => !currentHint.numbers?.includes(n));
      }
    }

    setGrid(newGrid);
    setUserInputs(newUserInputs);
    setPencilMarks(newPencilMarks); // save updated marks (if removed)

    const updatedHints = findHints(newGrid, newPencilMarks);
    setHints(updatedHints);
    setHintIndex(0);
    skipNextEffect.current = true;
    updateConflicts(newGrid, newUserInputs);
  };

  const handleBackHint = () => {
    if (history.length === 0) return;

    const prevState = history[history.length - 1];
    setGrid(prevState.grid.map(r => [...r]));
    setUserInputs(new Set(prevState.userInputs));
    setPencilMarks(JSON.parse(JSON.stringify(prevState.pencilMarks)));
    updateConflicts(prevState.grid, prevState.userInputs);

    // regenerate hints based on previous state
    const updatedHints = findHints(prevState.grid, prevState.pencilMarks);
    setHints(updatedHints);
    setHintIndex(0);

    // remove that last state
    setHistory(prev => prev.slice(0, -1));
  };

  function shouldHighlight(cellId, number, hint) {
    if (!hint) return false;

    const isPair = hint.strategy?.includes('Pair');

    if (isPair) {
      // pair digits in the pair cells = keep
      if (hint.relatedCells?.includes(cellId) && hint.numbers?.includes(number)) return 'hint-pair';

      // pair digits in the eliminated cells = remove
      if (hint.eliminatedFrom?.includes(cellId) && hint.numbers?.includes(number)) return 'hint-eliminated';
    }

    if (hint.strategy === 'Naked Single' || hint.strategy === 'Hidden Single') {
      if (hint.cell === cellId && hint.number === number) return 'hint-highlight';
    }

    return '';
  }

  useEffect(() => {
    if (!showHintBox) return;
    if (skipNextEffect.current) {
      skipNextEffect.current = false;
      return;
    }
  
    const updatedPencilMarks = generatePencilMarks(grid);
    const updatedHints = findHints(grid, updatedPencilMarks);
  
    setHints(updatedHints);
    setHintIndex(0);
    setPencilMarks(updatedPencilMarks);
  }, [grid, showHintBox]);

  return (
    <div className="board-wrapper-hint">
      <div className="board-and-controls">
        <div className="sudoku-grid">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="sudoku-row">
              {row.map((value, colIndex) => {
                const cellId = `${rowIndex}-${colIndex}`;
                return (
                  <SudokuCell
                    key={cellId}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    value={value}
                    cellId={cellId}
                    selectedCell={selectedCell}
                    highlightedCells={highlightedCells}
                    conflictCells={conflictCells}
                    userInputs={userInputs}
                    generatedCells={generatedCells}
                    pencilMarks={pencilMarks}
                    currentHint={currentHint}
                    shouldHighlight={shouldHighlight}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <NumberPad
          onNumberClick={handleNumberClick}
          selectedNumber={selectedNumber}
          onClearBoard={handleClearBoard}
          onSolve={handleSolve}
          onGenerate={handleGenerate}
          onHint={handleHint}
        />
      </div>

      {showHintBox && (
        <HintBox
          hint={currentHint}
          onApplyHint={handleApplyHint}
          onBackHint={handleBackHint}
          canGoBack={history.length > 0}
        />
      )}
    </div>
  );
};


export default SudokuBoard;
