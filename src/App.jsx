import SudokuBoard from './components/SudokuBoard';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1><u>Sudoku Solver</u></h1>
        <p>Enter or generate a random puzzle | Auto-solve or use hints to learn strategies</p>
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
