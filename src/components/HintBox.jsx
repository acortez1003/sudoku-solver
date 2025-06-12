import React from 'react';
import '../styles/HintBox.css';

const HintBox = ({ hint, onApplyHint, onBackHint, canGoBack }) => {
  return (
    <div className="hint-box">
      <h4>Hint</h4>
      <p>{hint ? hint.message : 'No hint available. Puzzle complete or multiple solutions.'}</p>
      <div className="hint-buttons">
        <button onClick={onApplyHint} disabled={!hint}>Apply</button>
        <button onClick={onBackHint} disabled={!canGoBack}>Back</button>
      </div>
    </div>
  );
};

export default HintBox;
