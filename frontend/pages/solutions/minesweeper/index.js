/*
You are given an m x n char matrix board representing the game board where:

'M' represents an unrevealed mine,
'E' represents an unrevealed empty square,
'B' represents a revealed blank square that has no adjacent mines (i.e., above, below, left, right, and all 4 diagonals),
digit ('1' to '8') represents how many mines are adjacent to this revealed square, and
'X' represents a revealed mine.
You are also given an integer array click where click = [clickr, clickc] represents the next click position among all the unrevealed squares ('M' or 'E').

Return the board after revealing this position according to the following rules:

If a mine 'M' is revealed, then the game is over. You should change it to 'X'.
If an empty square 'E' with no adjacent mines is revealed, then change it to a revealed blank 'B' and all of its adjacent unrevealed squares should be revealed recursively.
If an empty square 'E' with at least one adjacent mine is revealed, then change it to a digit ('1' to '8') representing the number of adjacent mines.
Return the board when no more squares will be revealed.

*/

import { useEffect, useState } from "react";

class Minesweeper {
  constructor(x, y) {
    this.board = Array(x).fill().map(() => Array(y).fill(''));
  }

  getRandomMax(max) {
    return Math.floor(Math.random() * max);
  }

  placeMines(mines) {
    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const row = this.getRandomMax(this.board.length);
      const col = this.getRandomMax(this.board[0].length);
      if (this.board[row][col] !== 'M') {
        this.board[row][col] = 'M';
        minesPlaced++;
      }
    }
  }

  checkCell(row, col) {
    if (this.board[row][col] === 'M') {
      this.board[row][col] = 'X';
      return;
    }

    let mines = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if ((row + i >= 0) && (row + i < this.board.length) && (col + j >= 0) && (col + j < this.board[0].length)) {
          if (this.board[row + i][col + j] === 'M') {
            mines++;
          }
        }
      }
    }

    if (mines > 0) {
      this.board[row][col] = mines.toString();
    } else {
      this.board[row][col] = 'B';
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if ((row + i >= 0) && (row + i < this.board.length) && (col + j >= 0) && (col + j < this.board[0].length)) {
            if (this.board[row + i][col + j] === '') {
              this.checkCell(row + i, col + j);
            }
          }
        }
      }
    }
  }

}

const minesweeper = new Minesweeper(9, 9);

const cellStyle = {
  width: '30px',
  height: '30px',
  border: '1px solid gray',
  textAlign: 'center',
  lineHeight: '30px',
  cursor: 'pointer'
}

export default function MinesweeperPage() {
  const [_, render] = useState({});

  useEffect(() => {
    minesweeper.placeMines(10);

    render({});
  }, []) 

  const handleClick = (row, col) => () => {
    minesweeper.checkCell(row, col);

    render({});
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', margin: '20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <h2>Minesweeper</h2>
      <div style={{ fontFamily: 'sans-serif'}}>
        {minesweeper.board.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex' }}>
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} style={cellStyle} role='button' onClick={handleClick(rowIndex, cellIndex)}>
                {cell}
              </div>
            ))}
          </div>
        ))}  
      </div>
    </div>
  )
}