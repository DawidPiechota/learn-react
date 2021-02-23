function shuffle(array) {
  let m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function swapTwoRandomElements(array) {
  let x = Math.floor(Math.random() * array.length);
  let y = Math.floor(Math.random() * array.length);
  [ array[x], array[y] ] = [ array[y], array[x] ];
}

function getPointDistance(x1, y1, x2, y2) {
  const a = x1 - x2;
  const b = y1 - y2;
  return Math.sqrt( a*a + b*b );
}

export function getPathCost(path, loc) {
  let sum = 0;
  for(let i = 0; i < path.length; i++) {
    sum+= getPointDistance(
      loc[path[i]].x,
      loc[path[i]].y,
      loc[path[(i + 1) % path.length]].x,
      loc[path[(i + 1) % path.length]].y
    );
  }
  return sum;
}

function* swapConsecutiveElements(path) {
  let base = path.slice();
  for(let i = 0; i < base.length; i ++) {
    for(let j = i; j < base.length; j ++) {
      if( i === j ) continue;
      [ base[i], base[j] ] = [ base[j], base[i] ];
      yield base.slice();
      base = path.slice();
    }
  }
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomPath(loc) {
  let newPath = loc.map( l => l.id);
  return shuffle(newPath);
}

export function* getBetterPath(loc) {
  let path = getRandomPath(loc);
  let bestCost = getPathCost(path, loc);
  let currentCost = bestCost;
  let currentPath = path.slice();
  let bestPath = path.slice();
  for(let i = 0; i < 20000000; i ++) {
    //currentPath = shuffle(currentPath);
    swapTwoRandomElements(currentPath);
    currentCost = getPathCost(currentPath, loc);
    if(currentCost < bestCost) {
      //console.log(i + ": " + Math.floor(bestCost));
      bestPath = currentPath.slice();
      bestCost = currentCost;
      yield [bestPath, bestCost];
    }
  }
}


export function* getLocalOptimum(loc) {
  let path = getRandomPath(loc);
  let bestCost = getPathCost(path, loc);
  let currentCost = bestCost;
  let currentPath = path.slice();
  let bestPath = path.slice();

  let foundOne = true;
  while(foundOne) {
    foundOne = false;

    neighbourCheck:
    for(let i = 0; i < currentPath.length; i ++) {
      for(let j = i; j < currentPath.length; j ++) {
        if( i === j ) continue;
  
        [ currentPath[i], currentPath[j] ] = [ currentPath[j], currentPath[i] ];
        currentCost = getPathCost(currentPath, loc);
        if(currentCost < bestCost) {
          foundOne = true;
          bestPath = currentPath.slice();
          bestCost = currentCost;
          yield [bestPath, bestCost];
          break neighbourCheck;
        } else {
          [ currentPath[j], currentPath[i] ] = [ currentPath[i], currentPath[j] ];
        }
      }
    }

  }
}