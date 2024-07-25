////intialisation

let ind = [];
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    let str = "sl" + i + j;
    ind.push({ key: 0, slot: str });
  }
}
for (let j = 0; j < 9; j++) {
  ind[j].key = j;
}
///////////////
let spaces = [];
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    spaces.push([i, j]);
  }
}
var dbb = [
  ["-1", "-1", "-1"],
  ["-1", "-1", "-1"],
  ["-1", "-1", "-1"],
];

/////////////////////////////////////////////////////////////////////////
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Utility function placeholder (you'll need to define this based on your requirements)
function utility(board) {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      if (board[i][0] === "O") {
        return -1;
      } else if (board[i][0] === "X") {
        return 1;
      }
    }
  }

  // Check for column-wise win
  for (let i = 0; i < 3; i++) {
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      if (board[0][i] === "O") {
        return -1;
      } else if (board[0][i] === "X") {
        return 1;
      }
    }
  }

  // Check for diagonal wins
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    if (board[0][0] === "O") {
      return -1;
    } else if (board[0][0] === "X") {
      return 1;
    }
  }

  if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    if (board[0][2] === "O") {
      return -1;
    } else if (board[0][2] === "X") {
      return 1;
    }
  }
  // Implement your utility function logic here
  return 0; // Example return value, modify as needed
}

function MAX(b, sp, steps) {
  let z = utility(b);

  if (z === 1 || z === -1) {
    return { v: z, k1: -1, k2: -1, staken: steps };
  } else {
    let staken = 1000;
    let k1 = -1;
    let k2 = -1;
    let v = -1000;
    for (let i = 0; i < sp.length; i++) {
      let db = deepCopy(b);
      let dsp = deepCopy(sp);
      db[dsp[i][0]][dsp[i][1]] = "O";
      let c1 = dsp[i][0];
      let c2 = dsp[i][1];
      dsp.splice(i, 1); // Remove element at index i
      let { v: val, k1: ii, k2: jj, staken: st } = MIN(db, dsp, steps + 1);
      if (st < staken && val >= v) {
        staken = st;
        v = val;
        k1 = c1;
        k2 = c2;
      } else if (st === staken && val >= v) {
        if (0.5 <= Math.random()) {
          staken = st;
          v = val;
          k1 = c1;
          k2 = c2;
        }
      }
    }
    return { v, k1, k2, staken };
  }
}

function MIN(b, sp, steps) {
  let z = utility(b);

  if (z === 1 || z === -1) {
    return { v: z, k1: -1, k2: -1, staken: steps };
  } else {
    let staken = 1000;
    let v = 1000;
    let k1 = -1;
    let k2 = -1;
    for (let i = 0; i < sp.length; i++) {
      let db1 = deepCopy(b);
      let dsp1 = deepCopy(sp);
      db1[dsp1[i][0]][dsp1[i][1]] = "X";
      let c1 = dsp1[i][0];
      let c2 = dsp1[i][1];
      dsp1.splice(i, 1); // Remove element at index i
      let { v: val, k1: ii, k2: jj, staken: st } = MAX(db1, dsp1, steps + 1);
      if (st < staken && val <= v) {
        staken = st;
        v = val;
        k1 = c1;
        k2 = c2;
      } else if (st === staken && val >= v) {
        if (0.5 <= Math.random()) {
          staken = st;
          v = val;
          k1 = c1;
          k2 = c2;
        }
      }
    }
    return { v, k1, k2, staken };
  }
}
export { spaces, ind, dbb, MIN, MAX };
