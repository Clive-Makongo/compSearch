function distance(arr, order) {
  let sum = 0;

  for (i = 0; i < arr.length - 1; i++) {
    //let cityA = arr[order[i]];
    let a = arr[order[i]].x - arr[order[i + 1]].x;
    let b = arr[order[i]].y - arr[order[i + 1]].y;
    let c = Math.sqrt(a * a + b * b);
    //console.log(order, c)

    sum += c;
  }

  return sum;
}

function lexOrder(array) {
  count++;

  let largestI = -1;
  let largestJ = -1;

  for (i = 0; i < array.length; i++) {
    if (array[i] < array[i + 1]) {
      largestI = i;
    }
  }

  for (j = 0; j < array.length; j++) {
    if (array[largestI] < array[j]) {
      largestJ = j;
    }
  }

  if (largestI != 0 && largestJ != 0) {
    swap(array, largestI, largestJ);

    let endArray = array.splice(largestI + 1);
    endArray.reverse();
    array.push(...endArray);
  }
  return array;
}

function factorial(n) {
  if (n == 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

function distBetween(a, b) {
  let x = a.x - b.x;
  let y = a.y - b.y;

  let z = Math.sqrt(x * x + y * y);
  return z;
}

function dec2bin(dec) {
  return dec >>> 0;
}

// function distBetween(a, b) {
//   let x = a.x - b.x;
//   let y = a.y - b.y;
//
//   return Math.sqrt(x * x + y * y).toFixed(2);
// }

//console.log(nodes);
