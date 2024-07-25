import React from "react";
import { useState } from "react";
import { spaces, ind, dbb, MIN, MAX } from "./min-max";
import "./styles.css";
/////

function logic(s, xo) {
  function find(arr, i, j) {
    return arr.findIndex((ele) => {
      return ele[0] === i && ele[1] === j;
    });
  }
  let ii, jj;
  console.log(s, xo);
  let i = Number(s.slice(2, 3));
  let j = Number(s.slice(3, 4));
  xo === "x" ? (dbb[i][j] = "X") : (dbb[i][j] = "O");

  let index = find(spaces, i, j);
  spaces.splice(index, 1);
  let mino = MIN(dbb, spaces, 0);
  let maxo = MAX(dbb, spaces, 0);
  if (maxo.staken <= mino.staken) {
    ii = maxo.k1;
    jj = maxo.k2;
  } else {
    ii = mino.k1;
    jj = mino.k2;
  }
  console.log(
    mino.k1,
    mino.k2,
    mino.staken,
    ".......",
    maxo.k1,
    maxo.k2,
    maxo.staken
  );
  if (ii !== -1 || jj !== -1) {
    xo === "x" ? (dbb[ii][jj] = "O") : (dbb[ii][jj] = "X");
    console.log(ii, jj);
    index = find(spaces, Number(ii), Number(jj));
    spaces.splice(index, 1);
    console.log(dbb);
    console.log(spaces);
    return [ii, jj];
  }
  return [-1, -1];
}
function sleep(t) {
  return new Promise((resolve) => {
    setTimeout(resolve, t);
  });
}
let state = {};
function Slots(props) {
  let [x, setx] = useState(false);
  let [o, seto] = useState(false);
  let s = String(props.slot);
  state[s] = { X: x, settxo: setx, O: o, settox: seto };
  async function Clicked() {
    console.log("hi");
    setx(true);
    state[s].settxo(true);
    console.log(s);
    let xo;
    xo = "x";
    await sleep(800);
    let [i, j] = logic(props.slot, xo);
    if (i !== -1 && j !== -1) {
      let tr = "sl" + i + j;
      state[tr].settox(true);
    }
  }
  //console.log(props);
  return (
    <div onClick={Clicked} className="slots" id={props.slot}>
      <div className="Ximg" style={{ opacity: state[s].X ? "1" : "0" }}>
        <div
          className="line"
          style={{ height: state[s].X ? "100px" : "0" }}
        ></div>
        <div
          className="line2"
          style={{ height: state[s].X ? "100px" : "0" }}
        ></div>
      </div>
      <div className="Oimg" style={{ opacity: state[s].O ? "1" : "0" }}>
        <div className="circle"></div>
      </div>
    </div>
  );
}
function Box() {
  return (
    <div>
      <div className="box">
        {ind.map((i) => (
          <Slots key={i.key} slot={i.slot} />
        ))}
      </div>
    </div>
  );
}
export default Box;
