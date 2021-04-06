
const BoardState = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]

const cells = document.querySelectorAll(".cell");
const status = document.querySelector(".status");
console.log(cells);

// CHECK IF BOARD IS EMPTY

var xIsNext = true;

const checkIfBoardIsEmpty = () => {

  for (i = 0; i < BoardState.length; i++) {
    if (BoardState[i].includes("")) {
      status.innerHTML = xIsNext ? `X is Next` : "O is Next";
      console.log("You can play");
      return true;
    } else {
      status.innerHTML = "GAME OVER!";
      console.log("Can't play");
    }
  }
}

checkIfBoardIsEmpty();


// HUMAN MOVE
cells.forEach((cell) => cell.addEventListener("click", playermove = () => {
  var currentPlayer = xIsNext ? "X" : "O";
  xIsNext = !xIsNext;
  let row = cell.dataset.row;
  let column = cell.dataset.column;
  BoardState[row][column] = (currentPlayer);
  cell.innerHTML = currentPlayer;
  cell.disabled = true;
  checkIfBoardIsEmpty();
  RunWinCheck();

}));

// COMPUTER's MOVE
// const ComputerMove = () => {

//   for (rows in BoardState) {
//     for (columns in BoardState[rows]) {
//       if (BoardState[rows][columns] == "") {
//         let r = 2;
//         let c = 2;
//         cells.forEach((cell) => {
//           if (cell.dataset.row == r && cell.dataset.column == c) {
//             cell.innerHTML = "O";
//             cell.classList.add("cell-disabled");
//           }
//         })
//         // BoardState[r][c] = "O";
//         // console.table(Math.random());
//       }
//     }
//   }
// }


// RESTART GAME

clearBoard = () => {
  for (row in BoardState) {
    for (column in BoardState[row])
      BoardState[row][column] = "";
  }
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.disabled = false;
    cell.classList.remove("disabled");
    cell.classList.remove("cell-disabled");
    status.classList.remove("won");
  })
  checkIfBoardIsEmpty();
  // const Text = <input />;
  // Text.innerHTML = document.location.href;
  // innerHTML.select();
  // document.execCommand("copy");
}

// Run CHECKIFWON only after 3 moves
var count = 0;
const RunWinCheck = () => {
  count++;
  if (count > 2) {
    CheckIfWon();
  }
}

// Check for WINNER

const CheckIfWon = () => {
  var Won = "X";
  const checkX = (c) => {
    if (c === 'X') {
      return true;
    }
    return false;
  }
  const checkO = (d) => {
    if (d === "O") {
      return true;
    }
  }

  const WinAction = (player, diagonal, rows, columns, equal) => {
    status.innerHTML = `${player} Has WON !!!`;
    status.classList.add("won");
    if (diagonal) {
      cells.forEach((cell) => {
        cell.disabled = true;
        if (cell.dataset.row === rows.toString() && cell.dataset.column === columns.toString()) {
          cell.classList.add("disabled");
        }
      })
      return;
    }
    if (rows) {
      cells.forEach((cell) => {
        cell.disabled = true;
        if (cell.dataset.row === rows.toString()) {
          cell.classList.add("disabled");
        }
      })
    }
    if (columns) {
      cells.forEach((cell) => {
        cell.disabled = true;
        if (cell.dataset.column === columns.toString()) {
          cell.classList.add("disabled");
        }
      })
    }
    if (equal) {
      cells.forEach((cell) => {
        cell.disabled = true;
        if (cell.dataset.row == cell.dataset.column) {
          cell.classList.add("disabled");
        }
      })
    }
  }

  // For ROWS horizontally

  for (let rows = 0; rows < BoardState.length; rows++) {
    if (BoardState[rows].every(checkX)) {
      WinAction("X", false, rows);
      return;
    }
    if (BoardState[rows].every(checkO)) {
      WinAction("O", false, rows);
      return;
    }
  }

  // For COLUMNS vertically
  const newArr = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  // newArr[1].splice(1,1,"hello world");

  for (rowz in BoardState) {
    for (columnz in BoardState[rowz]) {
      newArr[rowz].splice([columnz], 1, BoardState[columnz][rowz])
    }
    if (newArr[rowz].every(checkX)) {
      WinAction("X", false, null, rowz);
      return;
    }
    if (newArr[rowz].every(checkO)) {
      WinAction("O", false, false, rowz);
      return;
    }
  }
  console.table(newArr)
  // ARRAY and Inerted array
  // [
  //   [0.0, 0.1, 0.2]
  //   [1.0, 1.1, 1.2]
  //   [2.0, 2.1, 2.2]
  // ]
  // [
  //   [0.0, 1.0, 2.0]
  //   [0.1, 1.1, 2.1]
  //   [0.2, 1.2, 2.2]
  // ]

  // DIAGONAL LEFT

  const DiagonalArrayLeft = ["", "", ""];
  for (let rows in BoardState) {
    DiagonalArrayLeft.splice(rows, 1, BoardState[rows][rows])
    if (DiagonalArrayLeft.every(checkX)) {
      WinAction("X", false, null, false, true)
      return;
    }
    if (DiagonalArrayLeft.every(checkO)) {
      WinAction("O", false, null, false, true)
      return;
    }

  }

  // DIAGONAL RIGHT 

  let rows = 0;
  const DiagonalArrayRight = ["", "", ""];
  for (let columns = BoardState.length - 1; columns > -1; columns--) {
    console.log(columns, rows)
    DiagonalArrayRight.splice(rows, 1, BoardState[columns][rows]);
    if (DiagonalArrayRight.every(checkX)) {
      WinAction("X", true, rows, columns)
      return;
    }
    if (DiagonalArrayRight.every(checkO)) {
      status.innerHTML = "O has WON!!!";
      cells.forEach((cell) => {
        cell.disabled = true;
      })
      return;
    }
    rows++;
  }

}




// function to show new session
const session = 0;
const addSession = () => {
  session++;
} 
