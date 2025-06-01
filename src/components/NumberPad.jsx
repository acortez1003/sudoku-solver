import React from 'react';
import '../styles/NumberPad.css';
import { FaEraser } from 'react-icons/fa';
import { MdRestartAlt } from 'react-icons/md';

const NumberPad = ({ onNumberClick, selectedNumber, onClearBoard, onSolve, onGenerate, onHint }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="number-pad">
    <div className="number-row">
    {numbers.map((num) => (
      <button
        key={num}
        onClick={() => onNumberClick(num)}
        className={`num-button ${selectedNumber === num ? 'selected' : ''}`}
      >
        {num}
      </button>
    ))}
  </div>

  <div className="control-row">
    <button
      onClick={() => onNumberClick('')}
      className={`num-button ${selectedNumber === '' ? 'selected' : ''}`}
    >
      <FaEraser style={{ marginRight: '3px', marginBottom: '5px' }} />
    </button>

    <button
      onClick={onClearBoard}
      className="num-button danger"
    >
      <MdRestartAlt style={{ marginRight: '1px', marginBottom: '4px' }} />
    </button>
    </div>

    <div className="solve-row">
      <button className="solve-button" onClick={onGenerate}>
        Generate
      </button>
      <button className="solve-button" onClick={onSolve}>
        Solve
      </button>
      <button className="solve-button" onClick={onHint}>
        Hint
      </button>
    </div>
  </div>
  );
};


export default NumberPad;
