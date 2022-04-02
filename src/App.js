import React, { Component } from "react";
import {generateSudoku, checkSolution, shareUrl} from "./lib/sudoku";
import produce from "immer";
import SudokuBoard from "./componenets/SudokuBoard";
import "./App.css";
import reactDom from "react-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = produce({}, () => ({
      sudoku: generateSudoku()
    }));
  }

  handleChange = e => {
    this.setState(
      produce(state => {
        state.sudoku.rows[e.row].cols[e.col].value = e.value;
        if (!state.sudoku.solvedTime) {
          const solved = checkSolution(state.sudoku);
          if (solved) {
            state.sudoku.solvedTime = new Date();
            state.sudoku.shareUrl = shareUrl(state.sudoku);
          }
        }
      })
    );
  };

  solveSudoku = e => {
    this.setState(
      produce(state => {
        state.sudoku.rows.forEach(row => 
          row.cols.forEach(col => {
            col.value = state.sudoku.solution[col.row * 9 + col.col];
          })
        );
      })
    );
  };

  checkSudoku = e => {
    this.setState(
      produce(state => {
        state.sudoku.rows.forEach(row =>
          row.cols.forEach(col => {
            if (col.value != state.sudoku.solution[col.row * 9 + col.col]) {
              col.value = parseInt("")
            }
          })
        );
      })
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Sudoku</h1>
          {/* <h4>created by Drew Bozarth</h4> */}
        </header>
        <SudokuBoard sudoku={this.state.sudoku} onChange={this.handleChange} />

        <button onClick={this.solveSudoku}>Solve</button>
        <button onClick={this.checkSudoku}>Check</button>
      </div>
    )
  }
}

export default App
