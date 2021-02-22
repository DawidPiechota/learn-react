function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function pointDistance(x1, y1, x2, y2) {
  const a = x1 - x2;
  const b = y1 - y2;
  return Math.sqrt( a*a + b*b );
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

export function getPathCost(path, loc) {
  let sum = 0;
  for(let i = 0; i < path.length; i++) {
    sum+= pointDistance(
      loc[path[i]].x,
      loc[path[i]].y,
      loc[path[(i + 1) % path.length]].x,
      loc[path[(i + 1) % path.length]].y
    );
  }
  return sum;
}