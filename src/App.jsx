import SudokuBoard from './components/SudokuBoard';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>
        <img src="/sudoku.png" alt="Sudoku Logo" className="header-logo" />
          <u>Sudoku Solver</u>
        </h1>
        <p>Enter or generate a random puzzle | Auto-solve or use hints to learn strategies</p>
      </header>

      <main>
        <SudokuBoard />
      </main>

      <footer>
        <p>
          Built by <a href="https://acortez1003.github.io/" target="_blank" rel="noopener noreferrer">acortez1003</a> • 
          <img src="/github-mark.png" alt="GitHub Logo" className="github-logo" />
          <a href="https://github.com/acortez1003/sudoku-solver"><i class="fab fa-github"></i>GitHub</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
