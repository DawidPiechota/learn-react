import { useRef, useEffect, useState } from "react";
import { select } from "d3";

const Visualise = ({locations, svgWidth, svgHeight, links}) => {
  const svgRef = useRef();

  function updateLinks() {
    const svg = select(svgRef.current);
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

    if(!links) {
      svg
      .selectAll("path")
      .remove();
    }

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
    updateNodes();
  }

  function updateNodes() {
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

  useEffect(() => {
    updateLinks();
  },[links])

  useEffect(() => {
    updateNodes();
  }, [locations]);

  return (
    <>
      <svg style={{outline: 'thin solid black'}} ref={svgRef} height={svgHeight} width={svgWidth}></svg>
    </>
  );
}
 
export default Visualise;