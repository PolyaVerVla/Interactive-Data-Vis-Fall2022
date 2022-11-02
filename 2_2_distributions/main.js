



/* CONSTANTS AND GLOBALS */
const width = window.innerWidth*0.8,
  height = window.innerHeight*0.8
  margin = {top:20, bottom:60, left:60, right:40} ,
  radius = 5;

/* LOAD DATA */
d3.json("../data/EnvironmentForest.json", d3.autoType)
  .then(data => {
    console.log(data)



    // const selectElement = d3.select("#dropdown")
    // selectElement
    // .selectAll("option")
    // .data ([
    //  { key : "All", label : "All"}
    //  { key : "Alabama", label : "Alabama"}
    //  { key : "All", label : "All"}
    //  { key : "All", label : "All"}
    //  { key : "All", label : "All"}
    //  { key : "All", label : "All"}
    //  { key : "All", label : "All"}
    //  { key : "All", label : "All"}
    //  { key : "All", label : "All"}
    //  { key : "All", label : "All"}
    //  { key : "All", label : "All"}
    //  { key : "All", label : "All"}
    //  { key : "All", label : "All"}
    //  { key : "All", label : "All"}
    //  { key : "All", label : "All"}
    //  { key : "All", label : "All"}
    //  { key : "All", label : "All"}
    //  { key : "All", label : "All"}
    //  { key : "All", label : "All"}
    //  { key : "All", label : "All"}
    //  { key : "All", label : "All"}
    //  { key : "All", label : "All"}
    //  { key : "All", label : "All"}
     


    // ])

    /* SCALES */

    const xScale = d3.scaleLinear()
    .domain([0,100])
    .range([margin.left, width - margin.right]) 

    const yScale = d3.scaleLinear()
    .domain([0,55])
    .range([height - margin.bottom, margin.top]) 

    const colorScale = d3.scaleLinear()
    .domain([0, 50])
    // .range(['white', 'red'])
    .range(['rgb(117, 199, 252)', 'rgb(255, 34, 34)'])

    const sqrtScale = d3.scaleSqrt()
   .domain([0, 100])
   .range([0, 11]);


   const xAxis = d3.axisBottom(xScale);
   const yAxis = d3.axisLeft(yScale);

    // const gradient = div.createLinearGradient(0,0,0,400)


    // gradient.addColorStop(0, 'rgb(173, 236, 237)')
    // gradient.addColorStop(1, 'rgb(255, 34, 34)')
    
    /* HTML ELEMENTS */
    
    const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)


    const circles = svg.selectAll(".dot")
    .data(data)
    .join(
      enter => enter
      .append("circle")
      .attr("r", 0)
      .call(sel => sel.transition()
        .duration(1000)
        .delay( d => d.PollutionHealthRisk*500)
        // .attr("r", 20)),
        .attr("r", d => sqrtScale(d.PopDensityperMi2))),

      update => update,
      exit => exit,
      )
    .attr("class", "dot")
    .attr("cx", d => xScale(d.PercentForestCover))
    .attr("cy", d => yScale(d.IndustrialToxins))
    .attr("fill", d => colorScale(d.PollutionHealthRisk))
    // .attr("r", d => sqrtScale(d.PopDensityperMi2))

    svg.append("g")
 .style("transform", `translate( 0px, ${height - margin.bottom}px)`)

 .call(xAxis);
  

     svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width - 500)
    .attr("y", height -3)
    .text("Forest cover by state (%)");



 svg.append("g")
//  .style("transform", 'translate( 50px, 0px)')
 .style("transform", `translate( ${margin.left}px, 0px)`)
 .call(yAxis);

 svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", height - 750)
    .attr("y", width-1220)
    .attr("dy", ".9em")
    .attr("transform", "rotate(-90)")
    .text("Industrial toxins (high/low)");


    const legend1 = d3.legendColor()
    .scale(colorScale)
    .labelOffset(20)
    .orient('horizontal')
    .labelFormat(d3.format(".0f"))
    .title("Health Risk(high/low)");
    

 svg.append("g")
    // .attr("class", "p")
    .attr("transform", `translate(${height+450}, 200)`)
    // .style("font-size", "1em")
    // .title("Pollution Health Risk (high - low)")
    .call(legend1);

    const legend2 = d3.legendSize()
    .scale(sqrtScale)
    .shape('circle')
    .shapePadding(15)
    .labelOffset(20)
    .orient('horizontal')
    .labelFormat(d3.format(".0f"))
    .title("Population Density(mi2)");


    svg.append("g")
    // .attr("class", "p")
    .attr("transform", `translate(${height+450}, 100)`)
   
    .call(legend2);




  });
