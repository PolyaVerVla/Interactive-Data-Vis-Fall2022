/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight ,
  margin = { top: 20, bottom: 500, left: 60, right: 40 };

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
 Promise.all([
  d3.json("../data/usState.json"),
  d3.csv("../data/usHeatExtremes.csv", d3.autoType),
]).then(([geojson, heats]) => {
  

console.log("geojson", geojson)
console.log("heats", heats)

  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)




  // SPECIFY PROJECTION
  
const projection = d3.geoAlbersUsa()

.fitSize([width, height], geojson)

  // DEFINE PATH FUNCTION

  const pathGen = d3.geoPath(projection)


  // APPEND GEOJSON PATH  

  const states = svg.selectAll("path.states")
  .data(geojson.features)
  .join("path")
  .attr("class", "path")
  .attr("d", coords => pathGen(coords))
  .attr("fill", "lightgrey")
  .attr("stroke", "grey")
  
  
  // APPEND DATA AS SHAPE

  const colorScale = d3.scaleLinear()
  .domain([-30, -7, 7, 30])
  .range(['blue', 'green', 'yellow', 'red'])
  

  const heatCircles = svg.selectAll("circle.heat")
  .data(heats)
  .join("circle")
  .attr("class", "heat")
  .attr("r", 5)
  .attr("fill", d => colorScale(d.Heat))
  .attr("transform", (d) => {
    
  const [x,y] = projection ([d.Long, d.Lat])

  return `translate(${x}, ${y})`
})



const legend = d3.legendColor()
    .scale(colorScale)
    .shapePadding(15)
    .labelOffset(20)
    .orient('horizontal')
    .labelFormat(d3.format(".0f"))
    .title("Tempruture Change in 95 Percent Days(℉)");


     svg.append("g")
     .attr("font-size", ".9em")
    // .attr("transform", `translate(${height-margin}px,${width-200}px)`)
    .attr("transform", "translate(10,500)")
    .call(legend);
})
