import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import { useRef, useEffect, useState } from "react";
import { select } from "d3";
import { getRandomInt, getRandomPath, getBetterPath, getLocalOptimum, getPathCost } from "./utils.js";

const Visualise = () => {
  const [locations, setLocations] = useState([{"x":785,"y":504,"id":0},{"x":729,"y":453,"id":1},{"x":280,"y":36,"id":2},{"x":986,"y":237,"id":3},{"x":262,"y":314,"id":4},{"x":127,"y":158,"id":5},{"x":266,"y":409,"id":6},{"x":237,"y":406,"id":7},{"x":396,"y":533,"id":8},{"x":312,"y":537,"id":9},{"x":964,"y":218,"id":10},{"x":815,"y":503,"id":11}]);
  const [links, setLinks] = useState([]);
  const [totalPathLength, setTotalPathLength] = useState(0);
  const [color, setColor] = useState("black");
  const svgRef = useRef();
  const svgWidth = 1025;
  const svgHeight = 630;
  const locationsNumber = 12;

  function drawLinks({clear = false} = {}) {
    const svg = select(svgRef.current);

    if(!links || clear) {
      svg
      .selectAll("path")
      .remove();
      return;
    }

    const link = d => {
      return (
        "M" +
        d.source.x +
        "," +
        d.source.y +
        " L" +
        d.target.x +
        "," +
        d.target.y
      );
    };

    const t = svg.transition()
        .duration(300);

    svg
      .selectAll("path")
      .data(links)
      .join(
        enter => enter.append("path")
          .attr("d", d => `M${d.source.x},${d.source.y} L${d.source.x},${d.source.y}`)
          .attr("stroke", "black")
          .attr("stroke-width", 2)
            .call(update => update.transition(t)
            .attr("d", link)),
      update => update
          .attr("stroke-width", 2)
          .call(update => update.transition(t)
            .attr("d", link)),
      exit => exit
          .remove()
      );
      
    drawNodes({redraw: true});
  }

  function drawNodes({redraw = false} = {}) {
    const svg = select(svgRef.current);
    const t = svg.transition()
        .duration(550);

    if(redraw) {
      svg.selectAll("circle").remove();
      svg
        .selectAll("circle")
        .data(locations)
        .join("circle")
        .attr("r", 5)
        .attr("cx", value => value.x)
        .attr("cy", value => value.y)
        .attr("fill", "blue")
      return;
    }

    svg
      .selectAll("circle")
      .data(locations)
      .join(
        enter => enter.append("circle")
          .attr("r", 3)
          .attr("cx", svgWidth / 2)
          .attr("cy", svgHeight / 2)
          .attr("fill", "cyan")
          .call(enter => enter.transition(t)
            .attr("r", 5)
            .attr("cx", value => value.x)
            .attr("cy", value => value.y)
            .attr("fill", "blue")),
        update => update
          .attr("r", 3)
          .attr("cx", svgWidth / 2)
          .attr("cy", svgHeight / 2)
          .attr("fill", "cyan")
          .call(update => update.transition(t)
            .attr("r", 5)
            .attr("cx", value => value.x)
            .attr("cy", value => value.y)
            .attr("fill", "blue")),
        exit => exit
            .remove()
        );
  }

  function getRandomLocations()  {
    setColor("black");
    setTotalPathLength(0);
    let newLocations = [];
    for(let i = 0; i < locationsNumber; i++) {
      newLocations.push({x: getRandomInt(30, svgWidth-30), y: getRandomInt(30, svgHeight-30), id: i});
    }
    return newLocations;
  }

  function convertPathToLinks(path, locations) {
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
  
  function getRandomLinks() {
    let path = getRandomPath(locations);
    let newLinks = convertPathToLinks(path, locations);
    return newLinks;
  }

  function solve() {
    setColor("black");
    let solver = getBetterPath(locations);
    const innerSolve = () => {
      const {
        done,
        value: [
          bestPath,
          bestCost
        ] = []
      } = solver.next();
      if(!done) {
        setLinks(convertPathToLinks(bestPath, locations))
        setTotalPathLength(Math.floor(bestCost));
        setTimeout(innerSolve, 500);
        return;
      }
      console.log("done");
      setColor("green");
    }
    innerSolve();
  }

  function solve2() {
    setColor("black");
    let solver = getLocalOptimum(locations);
    const innerSolve = () => {
      const {
        done,
        value: [
          bestPath,
          bestCost
        ] = []
      } = solver.next();
      if(!done) {
        setLinks(convertPathToLinks(bestPath, locations))
        setTotalPathLength(Math.floor(bestCost));
        setTimeout(innerSolve, 500);
        return;
      }
      console.log("done");
      setColor("green");
    }
    innerSolve();
  }

  useEffect(() => {
    drawLinks();
  },[links])

  useEffect(() => {
    drawLinks({clear: true});
    drawNodes();
  }, [locations]);

  return (
    <>
      <Grid
      container
      spacing={3}
      alignItems="center"
      justify="center"
    >
      <Grid item xs={12}>
        <svg style={{outline: 'thin solid black'}} ref={svgRef} height={svgHeight} width={svgWidth}></svg>
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained" color="primary" onClick={() => {
          setColor("black");
          const path = getRandomPath(locations);
          setTotalPathLength(Math.floor(getPathCost(path, locations)));
          setLinks(convertPathToLinks(path, locations));
          }}>
          Draw random path
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained" color="primary" onClick={() => setLocations(getRandomLocations())}>
          Random locations
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained" color="primary" onClick={solve2}>
          2-swap solve
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained" color="primary" onClick={solve}>
          Random solve
        </Button>
      </Grid>
    </Grid>
    <Grid
      container
      spacing={5}
      alignItems="center"
      justify="center"
    >
      <Grid item xs={12}>
        <Typography style={{color: color}} variant="h4">
          Total length: {totalPathLength}
        </Typography>
      </Grid>
    </Grid>
    </>
  );
}
 
export default Visualise;