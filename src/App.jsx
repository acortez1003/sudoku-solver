import SudokuBoard from './components/SudokuBoard';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Sudoku Solver</h1>
        <p>Enter or generate a puzzle for step-by-step hints or instantly solve</p>
      </header>

      <main>
        <SudokuBoard />
      </main>

      <footer>
        <p>
          Built by <a href="https://github.com/acortez1003" target="_blank" rel="noopener noreferrer">acortez1003</a> • 
          <a href="https://github.com/acortez1003/sudoku-solver" target="_blank" rel="noopener noreferrer"> View source on GitHub</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
