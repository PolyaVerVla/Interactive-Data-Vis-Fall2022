



/* CONSTANTS AND GLOBALS */
const width = window.innerWidth*0.8,
  height = window.innerHeight*0.8
  margin = {top:20, bottom:60, left:60, right:40} ,
  radius = 5;


  // these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;
let colorScale;
let sqrtScale;


/* APPLICATION STATE */
let state = {
  // data: [],
  // selectedParty: "All" // + YOUR INITIAL FILTER SELECTION
};


/* LOAD DATA */
d3.json("../data/EnvironmentForest.json", d3.autoType).then(raw_data => {
  // + SET YOUR DATA PATH
  console.log("data", raw_data);
  // save our data to application state
  state.data = raw_data;
  init();
});

// /* LOAD DATA */
// d3.json("../data/EnvironmentForest.json", d3.autoType)
//   .then(data => {
//     console.log(data) 


    // ])

    /* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  // + SCALES
  xScale = d3.scaleLinear()
  .domain([0,100])
  // .domain(d3.extent(state.data, d = d.PercentForestCover))
  .range([margin.left, width - margin.right]) 

  yScale = d3.scaleLinear()
    .domain([0,55])
    // .domain(d3.extent(state.data, d = d.IndustrialToxins))
    .range([height - margin.bottom, margin.top]) 

 colorScale = d3.scaleLinear()
    .domain([0, 50])
    .range(['rgb(117, 199, 252)', 'rgb(255, 34, 34)'])

 sqrtScale = d3.scaleSqrt()
    .domain([0, 100])
    .range([0, 11]);
  
  
    // + AXES
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);



  // + UI ELEMENT SETUP


  // + CREATE SVG ELEMENT
  svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

  const dots = svg
    .selectAll("circle")
    .data(state.data)
    .join(
      // + HANDLE ENTER SELECTION
       enter => enter.append("circle")
      .attr("r", 0)
      .call(sel => sel.transition()
        .duration(1000)
        .delay( d => d.PollutionHealthRisk*500)
        // .attr("r", 20)),
        .attr("r", d => sqrtScale(d.PopDensityperMi2)))

        .attr("class", "dot")
    .attr("cx", d => xScale(d.PercentForestCover))
    .attr("cy", d => yScale(d.IndustrialToxins))
    .attr("fill", d => colorScale(d.PollutionHealthRisk))
    
    
    .on("mouseover", (MouseEvent, d) => {

      console.log(d)
      // state.hover= d.State 
      // state.hover= d.RANK + " " + d.State;
      // state.hover["State"] = d.State;
      // state.hover["Rank"] = d.RANK;
      // state.hover=d
       state.hover={
        "State": d.State,
        "Rank": d.RANK,
        "Population Density (per mi^2) ": d.PopDensityperMi2,
       }
      console.log(state)
      draw();
    }),

            // + HANDLE UPDATE SELECTION
      update => update,

      // + HANDLE EXIT SELECTION
      exit => exit);

  // + CALL AXES

  svg.append("g")
  .style("transform", `translate( 0px, ${height - margin.bottom}px)`)
 
  .call(xAxis),
   
 
      svg.append("text")
     .attr("class", "x label")
     .attr("text-anchor", "end")
     .attr("x", width - 500)
     .attr("y", height -3)
     .text("Forest cover by state (%)"),
 
 
 
  svg.append("g")
 //  .style("transform", 'translate( 50px, 0px)')
  .style("transform", `translate( ${margin.left}px, 0px)`)
  .call(yAxis),
 
  svg.append("text")
     .attr("class", "y label")
     .attr("text-anchor", "end")
     .attr("x", height - 750)
     .attr("y", width-1220)
     .attr("dy", ".9em")
     .attr("transform", "rotate(-90)")
     .text("Industrial toxins index (low/high)")
 
 
     const legend1 = d3.legendColor()
     .scale(colorScale)
     .labelOffset(20)
     .shapePadding(15)
     .orient('horizontal')
     .labelFormat(d3.format(".0f"))
     .title("Health Risk (low/high)");
     
 
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
     .title("Population Density(mi^2)");
 
 
     svg.append("g")
     // .attr("class", "p")
     .attr("transform", `translate(${height+450}, 100)`)
    
     .call(legend2);
 

  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {

  // + FILTER DATA BASED ON STATE
  // const filteredData = state.data
    // .filter(d => state.selectedParty === "All" || state.selectedParty === d.Party)


  const hoverData = state.hover ? Object.entries(state.hover) : [undefined];
  console.log(hoverData)

  // const hoverData = Object.entries(state.hover);
  // console.log(hoverData)


  // d3.select("#hover-content")
  // .selectAll("div.row")
  // .data(hoverData)
  // .join("div")
  // .attr("class", "row")
  // .html( d => state.hover ?
  //   : null )



  d3.select("#hover-content")
  .selectAll("div.row")
  .data(hoverData)
  .join("div")
  .attr("class", "row")
  // .html("State: " + hover)
  .html( d => 
    d[1]
    ? `${d[0]}: ${d[1]}`
    : null )


  };



    /* SCALES */

  //   const xScale = d3.scaleLinear()
  //   .domain([0,100])
  //   .range([margin.left, width - margin.right]) 

  //   const yScale = d3.scaleLinear()
  //   .domain([0,55])
  //   .range([height - margin.bottom, margin.top]) 

  //   const colorScale = d3.scaleLinear()
  //   .domain([0, 50])
  //   // .range(['white', 'red'])
  //   .range(['rgb(117, 199, 252)', 'rgb(255, 34, 34)'])

  //   const sqrtScale = d3.scaleSqrt()
  //  .domain([0, 100])
  //  .range([0, 11]);


  //  const xAxis = d3.axisBottom(xScale);
  //  const yAxis = d3.axisLeft(yScale);

    // const gradient = div.createLinearGradient(0,0,0,400)


    // gradient.addColorStop(0, 'rgb(173, 236, 237)')
    // gradient.addColorStop(1, 'rgb(255, 34, 34)')
    
    /* HTML ELEMENTS */
    
    // const svg = d3.select("#container")
    // .append("svg")
    // .attr("width", width)
    // .attr("height", height)

  // let tooltip = d3.select('#tooltip')

    // let circles = svg.selectAll(".dot")
    // .data(data)
    // .join(
    //   enter => enter
    //   .append("circle")
    //   .attr("r", 0)
    //   .call(sel => sel.transition()
    //     .duration(1000)
    //     .delay( d => d.PollutionHealthRisk*500)
    //     // .attr("r", 20)),
    //     .attr("r", d => sqrtScale(d.PopDensityperMi2))),

    //   update => update,
    //   exit => exit,
    //   )
    // .attr("class", "dot")
    // .attr("cx", d => xScale(d.PercentForestCover))
    // .attr("cy", d => yScale(d.IndustrialToxins))
    // .attr("fill", d => colorScale(d.PollutionHealthRisk))
    // .attr("r", d => sqrtScale(d.PopDensityperMi2))
  //  .on("mouseover", (item)  =>
  //  tooltip.transition()
  //  .style("visability", "visible")

  //  if (item ['IndustrialToxins'] ! = '') {

  //  }


//     svg.append("g")
//  .style("transform", `translate( 0px, ${height - margin.bottom}px)`)

//  .call(xAxis);
  

//      svg.append("text")
//     .attr("class", "x label")
//     .attr("text-anchor", "end")
//     .attr("x", width - 500)
//     .attr("y", height -3)
//     .text("Forest cover by state (%)");



//  svg.append("g")
// //  .style("transform", 'translate( 50px, 0px)')
//  .style("transform", `translate( ${margin.left}px, 0px)`)
//  .call(yAxis);

//  svg.append("text")
//     .attr("class", "y label")
//     .attr("text-anchor", "end")
//     .attr("x", height - 750)
//     .attr("y", width-1220)
//     .attr("dy", ".9em")
//     .attr("transform", "rotate(-90)")
//     .text("Industrial toxins (high/low)");


//     const legend1 = d3.legendColor()
//     .scale(colorScale)
//     .labelOffset(20)
//     .shapePadding(15)
//     .orient('horizontal')
//     .labelFormat(d3.format(".0f"))
//     .title("Health Risk(high/low)");
    

//  svg.append("g")
//     // .attr("class", "p")
//     .attr("transform", `translate(${height+450}, 200)`)
//     // .style("font-size", "1em")
//     // .title("Pollution Health Risk (high - low)")
//     .call(legend1);

//     const legend2 = d3.legendSize()
//     .scale(sqrtScale)
//     .shape('circle')
//     .shapePadding(15)
//     .labelOffset(20)
//     .orient('horizontal')
//     .labelFormat(d3.format(".0f"))
//     .title("Population Density(mi2)");


//     svg.append("g")
//     // .attr("class", "p")
//     .attr("transform", `translate(${height+450}, 100)`)
   
//     .call(legend2);




  // })
