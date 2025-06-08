import React from 'react';
import '../styles/HintBox.css';

const HintBox = ({ hint, onNextHint, onApplyHint }) => {
  return (
    <div className="hint-box">
      <h4>Hint</h4>
      {hint ? (
        <>
          <p>{hint.message}</p>
          <div className="hint-buttons">
            <button onClick={onApplyHint}>Apply</button>
            <button onClick={onNextHint}>Next</button>
          </div>
        </>
      ) : (
        <p>No hints available</p>
      )}
    </div>
  );
};

export default HintBox;
