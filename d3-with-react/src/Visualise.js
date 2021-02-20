import { useRef, useEffect, useState } from "react";
import { select } from "d3";

const Visualise = ({locations}) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(locations)
      .join("circle")
      .attr("r", 10)
      .attr("cx", value => value * 2)
      .attr("cy", value => value * 2)
      .attr("stroke", "black")
      .attr("fill", "blue");
  }, [locations]);

  return (
    <>
      <svg style={{outline: 'thin solid black', width: "60vw", height: "60vh"}}ref={svgRef}></svg>
    </>
  );
}
 
export default Visualise;