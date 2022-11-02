 /* CONSTANTS AND GLOBALS */
const width = window.innerWidth*0.8,
height = window.innerHeight*0.8
margin = {top:20, bottom:50, left:80, right:60} ,


/* LOAD DATA */
d3.csv('../data/water.csv', d => {
  return {
    year: new Date(+d.Year, 0, 1),
    country: d.Entity,
    water: + d.Freshwaterresourcespercapita 
  }
})
.then(data => {
  console.log('data :>> ', data);

  

  const chinadata = data.filter(d => d.country === "China")
  const indiadata = data.filter(d => d.country === "India")
  const usaadata = data.filter(d => d.country === "United States ")
  const rudata = data.filter(d => d.country === "Russia")
  const indonesiadata = data.filter(d => d.country === "Indonesia")
  const japandata = data.filter(d => d.country === "Japan")
  const nigeriadata = data.filter(d => d.country === "Nigeria")
  const canadadata = data.filter(d => d.country === "Canada")
  const congodata = data.filter(d => d.country === "Congo")
  const colombiadata = data.filter(d => d.country === "Colombia")
  const nordata = data.filter(d => d.country === "Norway")
  const myandata = data.filter(d => d.country === "Myanmar")
  
console.log("canadadata","chinadata","colombiadata","congodata",
  "japandata","indiadata","indonesiadata","myandata","nigeriadata","usaadata",
  "rudata","nordata", canadadata, chinadata, colombiadata, congodata,
  japandata, indiadata, indonesiadata, myandata, nigeriadata, usaadata,
  rudata, nordata )

  // SCALES
  // const filterdata = [...canadadata,...chinadata,...colombiadata,...congodata,
  //   japandata,...indiadata,...indonesiadata,...myandata,...nigeriadata,...usaadata,
  //   ...rudata,...nordata]

    const filterdata = [...canadadata,...colombiadata,...chinadata]

    // const filterdata = [...canadadata]
  
    // const yScale = d3.scaleLinear()
    // .domain(d3.extent(filterdata, d => d.water))
    // .range([height - margin.bottom, margin.top]) 

    const yScale = d3.scaleLinear()
    .domain([0, d3.max(filterdata, function (d)        {
      return d.water;
    })])
    .nice()
    .range([height - margin.bottom, margin.top]) 


    // const xScale = d3.scaleTime()
    // .domain(d3.extent(filterdata, d => d.year))
    // .range([margin.left, width - margin.right]) 

    const xScale = d3.scaleTime()
    .domain(d3.extent(filterdata, function (d) {
      return d.year;
    }))
    // .nice()
    .range([margin.left, width - margin.right]) 
    



    console.log(yScale.domain())
    console.log(xScale.domain())

    
  const xAxis = d3.axisBottom(xScale);
   const yAxis = d3.axisLeft(yScale);
   

  // CREATE SVG ELEMENT

  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

   

  // BUILD AND CALL AXES

  // LINE GENERATOR FUNCTION

  // DRAW LINE

  // const line = d3.line() 
  //   .x(d=> xScale(d.year))
  // .y(d=> yScale(d.water))


  // const area = d3.area()
  // .x(d=> xScale(d.year))
  // .y0( d => yScale(0))
  // .y1(d=> yScale(d.water))


  const area = d3.area()
    .x(function(d) { return xScale(d.year); })
    .y1(function(d) { return yScale(d.water); })   
    .y0(yScale(0));  
    

    const myColor = d3.scaleOrdinal().domain(filterdata)
       .range(d3.schemeSet3)
    
    const groupeData = d3.groups(filterdata, d => d.country)
    console.log(groupeData)

  // svg.append("path")
  // .attr("class", "fill-color")
  // .attr("stroke", "red")
  // .attr("stroke-width", "1px")
  // .attr("d", area(filterdata))



  
  // const path = svg.selectAll("path")
  // .data([canadadata, chinadata, colombiadata, congodata,
  //   japandata, indiadata, indonesiadata, myandata, nigeriadata, usaadata,
  //   rudata, nordata])
  //   .join("path")
  //   .attr("class", d => d.country)
  //   .attr("d", d => line(d))
  //  .attr("stroke", "black")

   const path = svg.selectAll("path")
    .data(groupeData)
    .join("path")
    // .attr("class", "fill-color")
    .attr("d", ([ country, filterdata]) => area(filterdata))
    // .attr("fill", "pink")
   .attr("stroke", "red")
   .attr("fill", function(d){return myColor(d)})
  
  
  svg.append("g")
 .style("transform", `translate( 0px, ${height - margin.bottom}px)`)
 .call(xAxis);

 svg.append("text")
 .attr("class", "x label")
 .attr("text-anchor", "end")
 .attr("x", width - 600)
 .attr("y", height -3)
 .text("Year");

 svg.append("g")
 .style("transform", `translate( ${margin.left}px, 0px)`)
 .call(yAxis);
  
 svg.append("text")
 .attr("class", "y label")
 .attr("text-anchor", "end")
 .attr("x", height - 750)
 .attr("y", width-1230)
 .attr("dy", ".9em")
 .attr("transform", "rotate(-90)")
 .text("Industrial toxins (high/low)");


 svg.append("text")
 .attr("class", "country-label1")
 .attr("font-size", ".9em")
 .attr("text-anchor", "end")
 .attr("x", width -10)
 .attr("y", height-240)
 .text("Canada");


 svg.append("text")
 .attr("class", "country-label2")
 .attr("font-size", ".9em")
 .attr("text-anchor", "end")
 .attr("x", width + 1)
 .attr("y", height - 110)
 .text("Colombia");


 svg.append("text")
 .attr("class", "country-label3")
 .attr("font-size", ".9em")
 .attr("text-anchor", "end")
 .attr("x", width -20)
 .attr("y", height - 50)
 .text("China");


});
