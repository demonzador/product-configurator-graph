const width = 800, height = 600;
const svg = d3.select("#graph").append("svg")
  .attr("width", width)
  .attr("height", height);

const colorMap = {
  Compatible: "#4CAF50",
  Incompatible: "#F44336",
  Requires: "#2196F3",
  Optional: "#FF9800"
};

// Встав URL WebApp JSON сюди
const JSON_URL = "PASTE_YOUR_WEBAPP_URL_HERE";

fetch(JSON_URL)
  .then(response => response.json())
  .then(data => {
    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id(d => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke", d => colorMap[d.type] || "#999")
      .attr("stroke-width", 2);

    const node = svg.append("g")
      .selectAll("circle")
      .data(data.nodes)
      .join("circle")
      .attr("r", 10)
      .attr("fill", "#69b3a2")
      .call(drag(simulation));

    const label = svg.append("g")
      .selectAll("text")
      .data(data.nodes)
      .join("text")
      .text(d => d.id)
      .attr("font-size", 12)
      .attr("dx", 12)
      .attr("dy", ".35em");

    simulation.on("tick", () => {
      link.attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

      node.attr("cx", d => d.x).attr("cy", d => d.y);
      label.attr("x", d => d.x).attr("y", d => d.y);
    });

    function drag(simulation) {
      return d3.drag()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        });
    }
  });