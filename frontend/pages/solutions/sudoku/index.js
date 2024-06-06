import { useState } from 'react';


class Sudoku {
  
  constructor() {
    this.board = Array(9).fill().map(() => Array(9).fill(''));
  }
  
  // This is not necessary for the solution, but it's a good practice to have it
  checkRow(row, value) {
    return this.board[row].includes(value);
  }
  // This is not necessary for the solution, but it's a good practice to have it
  checkColumn(column, value) {
    return this.board.map(row => row[column]).includes(value);
  }

  checkSubgrid(row, column, value) {
    const subgridRow = Math.floor(row / 3) * 3;
    const subgridColumn = Math.floor(column / 3) * 3;

    for (let i = subgridRow; i < subgridRow + 3; i++) {
      for (let j = subgridColumn; j < subgridColumn + 3; j++) {
        if (this.board[i][j] === value) {
          return true;
        }
      }
    }

    return false;
  }

  setValue(row, column, value) {
    if (this.checkRow(row, value) || this.checkColumn(column, value) || this.checkSubgrid(row, column, value)) {
      return;
    }

    this.board = [
      ...this.board.slice(0, row),
      [
        ...this.board[row].slice(0, column),
        value,
        ...this.board[row].slice(column + 1)
      ],
      ...this.board.slice(row + 1)
    ];
  }

  clear() {
    this.board = Array(9).fill().map(() => Array(9).fill(''));
  }

  
}

// A sudoku board is a 9x9 grid, with 3x3 subgrids.
// Each sub-grid can only have digits from 1-9, and digits cannot be repeated
// Interactions The user should be able to put a number 1-9 as long as it does not violate rule #2 The use should be able to clear the board

const sudoku = new Sudoku();

export default function SudokuPage() {
  const [_, render] = useState({});

  const handleClear = () => {
    sudoku.clear();

    render({});
  };

  const handleChange = (row, col) => (e) => {
    const { value } = e.target;
    let _value = value;

    if (!value.match(/[1-9]/)) {
      _value = '';
    }

    sudoku.setValue(row, col, _value);

    render({});
  } 

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', margin: '20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <h2>Sudoku</h2>
      <div id='sudoku-inputs' style={{ fontFamily: 'sans-serif'}}>
        {sudoku.board.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex'}}>
            {row.map((cell, cellIndex) => (
              <div key={cellIndex}>
                <input 
                  value={cell}
                  type='text'
                  maxLength='1'
                  size='1'
                  style={{
                    padding: '5px', 
                    height: '20px', 
                    width: '20px', 
                    fontSize: '20px', 
                    textAlign: 'center'
                  }} 
                  onChange={handleChange(rowIndex, cellIndex)}/>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex'}}>
        <button onClick={handleClear} >Clear</button>
      </div>
    </div>
  )
}
