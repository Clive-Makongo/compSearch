// let canvas;
// let ctx, perm;
// let cnvSize = 900;
//
// let order = [];
// let count = 0;
//
// let bestLength = Infinity;
// let bestPath = [];
//
//
// let nodes = [];
// let totalNodes = 10;

function solve(arr) {
  let memoTable = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    memoTable[i] = new Array(2 ** arr.length).fill(null);
  }

  return memoTable;
}

function setup(dist, memoTable, start, nodes) {
  for (let i = 0; i < nodes; i++) {
    if (!(i == start)) {
      memoTable[i][(1 << start) | (1 << i)] = dist[start][i];
    }
  }

  return memoTable;
}

//let thhis = combination(3, 4)
//console.log(thhis, notIn(4, thhis[0]));

function bestRoute(distMatrix, memo, start, N) {
  for (let r = 3; r <= N; r++) {
    for (let subset of combination(r, N)) {
      if (!notIn(start, subset)) {
        for (let next = 0; next < N; next++) {
          let minDist = Infinity;
          if (!notIn(next, subset) && !(next == start)) {
            let state = subset ^ (1 << next);
            //console.log(state + " STATE", subset[i] + " SUBSET")
            // let minDist = Infinity;

            for (let e = 0; e < N; e++) {
              if (!(start == e) && !(e == next) && !notIn(e, subset)) {
                //console.log(state.toString(2), next.toString(2), subset.toString(2))
                let newDistance = memo[e][state] + distMatrix[e][next];
                if (newDistance < minDist) {
                  minDist = newDistance;
                }
                //console.log(newDistance + " New DIST ++++", minDist + " Min DIST ++++", e + " e")
                //console.log(memo[e][state] + " Memo DIST", distMatrix[e][start] + " Dist from MATRIX")
              }
            }
            // memo[next][subset] = minDist;
            //console.log(minDist + " GOES IN THE TABLE **************||||||||||||||||||||||")
          }
          memo[next][subset] = minDist;
          //console.log(subset.toString(2));
        }
      }
    }
  }

  return memo;
}

function minCost(distMatrix, memo, start, nodes) {
  let END_STATE = (1 << nodes) - 1;
  //console.log(END_STATE)

  let minimumCost = 1000000000;

  for (let end = 0; end < nodes; end++) {
    if (!(end == start)) {
      let tourCost = memo[end][END_STATE] + distMatrix[start][end];
      if (tourCost < minimumCost);
      minimumCost = tourCost;
      //console.log(tourCost)
    }
  }

  //minimumCost;
  return minimumCost;
}

function combination(r, n) {
  let subsets = [];
  combinationRec(0, 0, r, n, subsets);
  return subsets;
}

function combinationRec(set, at, r, n, subsets) {
  if (r == 0) {
    subsets.push(set);
  } else {
    for (let i = at; i < n; i++) {
      set = set | (1 << i);

      combinationRec(set, i + 1, r - 1, n, subsets);

      set = set & ~(1 << i);
    }
  }
}

function getPath(distMatrix, memo, start, nodes) {
  let lastIndex = start;
  let state = (1 << nodes) - 1;
  //console.log(state);
  let tour = new Array(nodes + 1);
  //tour.push(start);

  for (let i = nodes - 1; i >= 1; i--) {
    let bestIndex = -1;
    //let index;
    let bestDist = Infinity;
    for (let j = 0; j < nodes; j++) {
      if (!notIn(j, state) && !(j == start)) {
        if (bestIndex == -1) bestIndex = j; //, index = j;
        let prevDist =
          memo[bestIndex][state] + distMatrix[bestIndex][lastIndex];
        let newDistance = memo[j][state] + distMatrix[j][lastIndex];
        if (newDistance < prevDist) {
          bestIndex = j;
          bestDist = newDistance;
          lastIndex = bestIndex;
          //console.log(prevDist, newDistance)
        }

        //console.log(memo);

        //console.log(" First", distMatrix[i][lastIndex] + " Dist", memo[j][state] + " Memo")
        //console.log(prevDist + " Prev", newDistance + " New")
      }
      //console.log(state.toString(2))
    }

    state = state ^ (1 << bestIndex);
    console.log(state.toString(2), bestDist, tour, memo);
    tour[i] = bestIndex;
    //console.log(bestIndex, ": best index", state.toString(2) + " :STATE w/o J ****", tour, ": TOUR");
  }

  tour[nodes] = tour[0] = start;

  tour.reverse();
  //console.log(tour);
  return tour;
}

function notIn(i, subsets) {
  return ((1 << i) & subsets) == 0;
}

class Node {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
  }

  Draw() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(this.x / 2, this.y, 2.5, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

class AdjMatrix {
  constructor(arr) {
    this.rows = arr.length;
    this.cols = arr.length;
    this.matrix = [];

    for (let i = 0; i < this.rows; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = distBetween(arr[i], arr[j]);
      }
    }
  }
}

for (let i = 0; i < totalNodes; i++) {
  let nodeX = Math.floor(Math.random() * 280 + 10);
  let nodeY = Math.floor(Math.random() * 380 + 40);
  nodes[i] = new Node(nodeX, nodeY, i);
  order[i] = i;
}

let distMatrix = new AdjMatrix(nodes);
console.log(distMatrix.matrix);
// console.log(distMatrix.matrix[0][1]);
// let stuff = new AdjMatrix(nodes, totalNodes, totalNodes);

// //
// //console.log((1 << 0) | (1 << 1));
// //console.log(memo)
// console.log(memoDist)
// console.log(minimCost)
//  console.log(vals2)
// console.log(bestPath2)

// function printCombo() {
//   let combo = combination(5, 8)
//   for (let i = 0; i < 10; i++){
//     console.log(combo)
//     console.log(dec2bin(combo[i]))
//   }
// }
// printCombo();
