let canvas;
let ctx, perm;
let cnvSize = 1200;

let order = [];
let count = 0;

let bestLength = Infinity;
let bestPath = [];
let bestPath2 = [];
let dpOrder = [];
let returnDist, bestLengthACT, inter;

let nodes = [];
let totalNodes = 7;
document.addEventListener("DOMContentLoaded", SetupCanvas);

function SetupCanvas() {
  canvas = document.getElementById("my-canvas");
  ctx = canvas.getContext("2d");
  canvas.width = cnvSize;
  canvas.height = cnvSize;

  ctx.scale(2, 2);

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "white";
  ctx.strokeRect(8, 8, 580, 580);

  for (let i = 0; i < totalNodes; i++) {
    let nodeX = Math.floor(Math.random() * 560 + 20);
    let nodeY = Math.floor(Math.random() * 560 + 20);
    nodes[i] = new Node(nodeX, nodeY, i);
    order[i] = i;
  }

  Render();
}

function Render() {
  let memo = solve(nodes);
  let memoDist = setup(distMatrix.matrix, memo, 0, totalNodes);
  let vals2 = bestRoute(distMatrix.matrix, memoDist, 0, totalNodes);
  let minimCost = minCost(distMatrix.matrix, vals2, 0, totalNodes);
  bestPath2 = [...getPath(distMatrix.matrix, vals2, 0, totalNodes)];
  console.log(bestPath2,bestPath);

  perm = factorial(totalNodes - 1);
  //console.log(minimCost);
  let percent = ((count / perm) * 100).toFixed(5);
  if (count + 1 >= perm) {
    count = perm;
  }

  let newOrder = [...lexOrder(order)];

  ctx.clearRect(0, 0, cnvSize, cnvSize);

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "white";
  ctx.strokeRect(8, 8, 580, 580);

  ctx.beginPath();
  for (let i = 0; i < totalNodes - 1; i++) {
    nodes[i].Draw();

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(nodes[newOrder[i]].x / 2, nodes[newOrder[i]].y);
    ctx.lineTo(nodes[newOrder[i + 1]].x / 2, nodes[newOrder[i + 1]].y);
    ctx.stroke();
    ctx.closePath();

    // ctx.beginPath();
    // ctx.lineWidth = 1.3
    // ctx.moveTo((nodes[bestPath2[i]].x / 2) + 200, nodes[bestPath2[i]].y);
    // ctx.lineTo(nodes[bestPath2[i + 1]].x / 2 + 200, nodes[bestPath2[i + 1]].y);
    // //console.log(bestPath[i], bestPath[i + 1])
    // //ctx.strokeStyle = 'blue';
    // ctx.stroke();

    let curLength = distance(nodes, newOrder);
    returnDist = distBetween(
      nodes[newOrder[0]],
      nodes[newOrder[totalNodes - 1]]
    );
    inter = curLength + returnDist;
    //console.log(curLength, returnDist);
    if (inter < bestLength) {
      bestLength = inter;
      for (i = 0; i < nodes.length; i++) {
        bestPath[i] = newOrder[i];
      }
      // bestLengthACT = bestLength + returnDist;
      //console.log(bestPath, returnDist, curLength, bestLength)
    }
  }
  //console.log(bestLength);

  for (let i = 0; i < totalNodes; i++) {
    dpOrder[i] = bestPath2[i];
  }
  //console.log(bestPath2);

  let best = distance(nodes, bestPath2);
  //let returnDist2 = distBetween(nodes[dpOrder[0]], nodes[dpOrder[totalNodes - 1]])
  //console.log(bestPath2, bestPath);
  //console.log(distMatrix.matrix,vals2,memoDist);

  for (let i = 0; i < bestPath.length - 1; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1.3;
    ctx.moveTo(nodes[bestPath[i]].x / 2, nodes[bestPath[i]].y);
    ctx.lineTo(nodes[bestPath[i + 1]].x / 2, nodes[bestPath[i + 1]].y);
    ctx.strokeStyle = "red";
    ctx.stroke();
  }

  for (let i = 0; i < dpOrder.length - 1; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1.7;
    ctx.moveTo(nodes[dpOrder[i]].x / 2 + 250, nodes[dpOrder[i]].y);
    ctx.lineTo(nodes[dpOrder[i + 1]].x / 2 + 250, nodes[dpOrder[i + 1]].y);
    //console.log(bestPath[i], bestPath[i + 1])
    ctx.strokeStyle = "blue";
    ctx.stroke();
  }

  //console.log(returnDist, returnDist2, dpOrder, bestPath)
  //let best = distBetween(nodes[bestPath2[0]], nodes[bestPath2[totalNodes - 1]])

  ctx.fillStyle = "white";
  ctx.font = "12px Arial";
  ctx.fillText("Order : " + newOrder.toString(), 20, 560);
  ctx.fillText("Percent Done : " + percent.toString(), 430, 35);
  ctx.fillText("Best  LEX Distance: " + Math.ceil(bestLength), 20, 35);
  ctx.fillText("Best  DP Distance: " + Math.ceil(best), 440, 560);

  requestAnimationFrame(Render);
}

function swap(arr, i, j) {
  temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
