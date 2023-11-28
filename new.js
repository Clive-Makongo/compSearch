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
    memoTable[i] = new Array(2 ** arr.length).fill(0);
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
      if (!(notIn(start, subset) == 0)) {
        for (let next = 0; next < N; next++) {
          if (!(notIn(next, subset) == 0) && !(next == start)) {
            let state = subset ^ (1 << next);
            var minDist = Infinity;

            console.log(state, state.toString(2), next + ' :Next ' + subset.toString(2) + ' :SUBSET ' + r + ' :R');

            for (let e = 0; e < N; e++) {
              if (!(start == e) && !(e == next) && !(notIn(e, subset) == 0)) {
                
                var newDistance = parseInt(memo[e][state]) + parseInt(distMatrix[e][next]);
                console.log(typeof minDist, typeof newDistance)
                if (newDistance < minDist) {
                  minDist = newDistance
                  
                  //console.log(r,subset.toString(2),next, e);
                  console.log(minDist, newDistance);
                }

              }
              
              //console.log(memo[next],state,state.toString(2),minDist + ' ----------');
            }
              memo[next][subset] = minDist;       
          }
        }
      }
    }
  }

  console.log(memo, distMatrix)
  return memo;
}

function minCost(distMatrix, memo, start, nodes) {
  let END_STATE = (1 << nodes) - 1;
  //console.log(END_STATE)

  let minimumCost = 3000;

  for (let end = 0; end < nodes; end++) {
    if (!(end == start)) {
      let tourCost = parseInt(memo[end][END_STATE]) + parseInt(distMatrix[end][start]);
      console.log(end, start, tourCost + " FFFFFFFFFFFFFFFFFFFFFFFFFFFF")
      if (tourCost < minimumCost);
      minimumCost = tourCost;

      console.log(tourCost, minimumCost);
    }
  }

  //minimumCost;
  //console.log(minimumCost + " FFFFFFFFFFFFFFFFFFFFFFFFFFFF")
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
      //
      //console.log(set,set.toString(2) + '???????????????????')

      combinationRec(set, i + 1, r - 1, n, subsets);

      set = set & ~(1 << i);
      //console.log(set,set.toString(2) + '??????????????????')
    }
  }
}

function getPath(distMatrix, memo, start, nodes) {
  let lastIndex = start;
  let state = (1 << nodes) - 1;
  let tour = new Array(nodes + 1);
  //tour.push(start);

  for (let i = nodes - 1; i > 0; i--) {
    var bestIndex = -1;
    var bestDist = 3000;
    //let index;
    //let bestDist = Infinity;
    for (let j = 0; j < nodes; j++) {
      if (!(notIn(j, state) == 0) && !(j == start)) {
       console.log(state.toString(2));
        if (bestIndex == -1) bestIndex = j; //, index = j;
        //let prevDist =
        //memo[bestIndex][state] + distMatrix[bestIndex][lastIndex];
        var newDistance = parseInt(memo[j][state]); + parseInt(distMatrix[j][lastIndex]);
        //console.log(bestIndex, j,prevDist,newDistance,memo);
        console.log(
          memo,
          bestIndex, 
          j,
          bestDist,
          newDistance + " +++++++++++++++" + state.toString(2)
        );
        //console.log(state.toString(2)   + " State <><><>", j + " J", index + " Index", i + " INDEX i")
        if (newDistance < bestDist) {
          bestIndex = j;
          bestDist = newDistance;
          //console.log(newDistance, state.toString(2))
          console.log(distMatrix,memo,state,state.toString(2), bestIndex);
          //bestDist = newDistance;
        }

        //console.log(index + " First", distMatrix[index][lastIndex] + " Dist", memo[j][state] + " Memo")
        //console.log(prevDist + " Prev", newDistance + " New")
      }
      //console.log(memo)
    }
    tour[i] = bestIndex;
    state = state ^ (1 << bestIndex);
    lastIndex = bestIndex;
    console.log(state.toString(2), tour,bestPath)
    //console.log(index + " Final /////", index + " index", state + " STATE w/o J ****");
  }

  tour[nodes] = tour[0] = start;

  //tour.reverse();
  console.log(tour,memo);
  return tour;
}

function notIn(i, subsets) {
  return ((1 << i) & subsets);
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
        this.matrix[i][j] = distBetween(arr[i], arr[j]).toFixed(2);
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
