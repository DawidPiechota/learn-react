import { useEffect, useState } from 'react';
import Visualise from './Visualise';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';



const Panel = () => {
  const [locations, setLocations] = useState([]);
  const [path, setPath] = useState([]);
  const [links, setLinks] = useState([]);
  const [totalPathLength, setTotalPathLength] = useState(0);
  const svgWidth = 1025;
  const svgHeight = 630;

  useEffect(() => {
    randomLocations();
    //shufflePath();
  }, []);

  function randomLocations()  {
    setPath([]);
    setLinks([]);
    let times = 10;
    let newLocations = [];
    for(let i = 0; i < times; i++) {
      newLocations.push({x: getRandomInt(30, svgWidth-30), y: getRandomInt(30, svgHeight-30), id: i});
    }
    setLocations(newLocations);
  }
  
  function getBetterPath() {

    const pointDistance = (x1, y1, x2, y2) => {
      var a = x1 - x2;
      var b = y1 - y2;
      return Math.sqrt( a*a + b*b );
    }
  
    function pathLength(path) {
      let sum = 0;
      for(let i = 0; i < path.length; i++) {
        sum+= pointDistance(
          locations[path[i]].x,
          locations[path[i]].y,
          locations[path[(i + 1) % path.length]].x,
          locations[path[(i + 1) % path.length]].y
        );
      }
      return sum;
    }

    let bestCost = pathLength(path);
    let currentCost = bestCost;
    let currentPath = path.slice();
    let bestPath = path.slice();
    for(let i = 0; i < 20000; i ++) {
      currentPath = shuffle(currentPath);
      currentCost = pathLength(currentPath);
      if(currentCost < bestCost) {
        console.log(i);
        bestPath = currentPath.slice();
        bestCost = currentCost;
      }
    }
    console.log("run");
    setPath(bestPath);
    setTotalPathLength(Math.floor(bestCost));
    //setTimeout(getBetterPath, 1000);
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

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

  function shufflePath() {
    let newPath = locations.map( l => l.id);
    setPath(shuffle(newPath));
  }

  useEffect(() => {
    function createLinks() {
      let newLinks = [];
      for(let i = 0; i < path.length; i++) {
        let link = {
          id: i,
          from: path[i],
          to: path[(i + 1) % path.length],
          source: {
            x: locations[path[i]].x,
            y: locations[path[i]].y,
          },
          target: {
            x: locations[path[(i + 1) % path.length]].x,
            y: locations[path[(i + 1) % path.length]].y,
          }
        }
        newLinks.push(link);
      }
      return newLinks;
    }
    
    setLinks(createLinks());
  }, [path]);

  return (
      <Visualise />
   );
}
 
export default Panel;