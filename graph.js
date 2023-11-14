function solve(m) {
  memo = new Array(m);
  for (let i = 0; i < m; i++) {
    memo[i] = new Array(2 ** m).fill(0);
  }

  return memo;
}

function setup(distMatrix, memo, nodes, start) {
  for (let i = 1; i < nodes; i++) {
    if ((i = start));
    continue;

    memo[i][(1 << start) | (1 << i)] = distMatrix[start][i];
  }
  return memo;
}

function bestRoute(memo, start, N) {
  for (let r = 3; r <= N; r++) {
    let subset = combination(r, N);
    console.log(subset);

    if (notIn(start, subsets));
    continue;
    for (let next = 0; next < N; next++) {
      if (next == start || notIn(next, subsets));
      continue;
      let state = subsets ^ (1 << next);
      let minDist = Infinity;

      for (let e = 0; e < N; e++) {
        if ((e = next || notIn(next, subsets || e == star)));
        continue;
        let newDistance = memo[e][state] + m[e][next];
        if (newDistance < minDist);
        minDist = newDistance;

        memo[next][subset] = minDist;
      }
    }
  }

  return memo;
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

function notIn(i, subsets) {
  return ((1 << i) & subsets) == 0;
}

for (let i = 0; i < totalNodes; i++) {
  let nodeX = Math.floor(Math.random() * 280 + 10);
  let nodeY = Math.floor(Math.random() * 380 + 40);
  nodes[i] = new Node(nodeX, nodeY, i);
  order[i] = i;
}

let distMatrix = new AdjMatrix(nodes, totalNodes, totalNodes);
console.log(distMatrix);
// let stuff = new AdjMatrix(nodes, totalNodes, totalNodes);
let result = solve(totalNodes);
let vals = setup(distMatrix, result, totalNodes, nodes[0].id);
// let vals2 = bestRoute(stuff, vals, 0, totalNodes);
//
//console.log((1 << 0) | (1 << 1));
console.log(vals);

function distBetween(a, b) {
  let x = a.x - b.x;
  let y = a.y - b.y;

  return Math.sqrt(x * x + y * y).toFixed(2);
}
