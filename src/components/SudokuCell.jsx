const SudokuCell = ({
  rowIndex,
  colIndex,
  value,
  cellId,
  selectedCell,
  highlightedCells,
  conflictCells,
  userInputs,
  generatedCells,
  pencilMarks,
  currentHint,
  onClick,
  shouldHighlight,
}) => {
  return (
    <div
    className={`sudoku-cell
        ${colIndex % 3 === 0 ? 'border-left-bold' : ''}
        ${rowIndex % 3 === 0 ? 'border-top-bold' : ''}
        ${colIndex === 8 ? 'border-right-bold' : ''}
        ${rowIndex === 8 ? 'border-bottom-bold' : ''}
        ${selectedCell === cellId ? 'active' : ''}
        ${highlightedCells.has(cellId) ? 'highlight-same-number' : ''}
        ${conflictCells.includes(cellId) ? 'conflict' : ''}
        ${userInputs.has(cellId) ? 'user-input' : ''}
        ${generatedCells.has(cellId) ? 'generated' : ''}
    `}
    onClick={onClick}
    >
      {value || (
        pencilMarks[cellId] && (
          <div className="pencil-marks">
            {pencilMarks[cellId].map((n) => (
              <span key={n} className={shouldHighlight(cellId, n, currentHint)}>
                {n}
              </span>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default SudokuCell;
