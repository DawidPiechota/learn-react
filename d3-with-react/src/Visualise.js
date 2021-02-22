import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { useRef, useEffect, useState } from "react";
import { select } from "d3";
import { getRandomInt, getRandomPath, getBetterPath } from "./utils.js";

const Visualise = () => {
  const [locations, setLocations] = useState([{x: 20, y: 50},{x:100, y: 400}]);
  const [links, setLinks] = useState([]);
  const [totalPathLength, setTotalPathLength] = useState(0);
  const svgRef = useRef();
  const svgWidth = 1025;
  const svgHeight = 630;

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
        .duration(750);

    svg
      .selectAll("path")
      .data(links)
      .join(
        enter => enter.append("path")
          .attr("d", link)
          .attr("stroke", "black")
          .attr("stroke-width", 2),
      update => update
          .attr("stroke-width", 2)
        .call(update => update.transition(t)
          .attr("d", link)),
      exit => exit
          .remove()
      );
      
    svg.selectAll("circle").remove();
    drawNodes();
  }

  function drawNodes() {
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(locations)
      .join("circle")
      .attr("r", 5)
      .attr("cx", value => value.x)
      .attr("cy", value => value.y)
      .attr("stroke", "black")
      .attr("fill", "blue");
  }

  function getRandomLocations()  {
    let times = 14;
    let newLocations = [];
    for(let i = 0; i < times; i++) {
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
        //console.log(bestPath, bestCost);
        setLinks(convertPathToLinks(bestPath, locations))
        setTotalPathLength(Math.floor(bestCost));
        setTimeout(innerSolve, 800);
        return;
      }
      console.log("done");
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
      <Grid
      container
      spacing={3}
      alignItems="center"
      justify="center"
    >
      <Grid item xs={12}>
        <svg style={{outline: 'thin solid black'}} ref={svgRef} height={svgHeight} width={svgWidth}></svg>
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" color="primary" onClick={() => setLinks(getRandomLinks())}>
          Draw random path
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" color="primary" onClick={() => setLocations(getRandomLocations())}>
          Random locations
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button variant="contained" color="primary" onClick={solve}>
          Solve
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom>
          {totalPathLength}
        </Typography>
      </Grid>
    </Grid>
  );
}
 
export default Visualise;