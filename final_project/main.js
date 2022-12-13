 
 
 
 /* CONSTANTS AND GLOBALS */
const width = window.innerWidth*0.7,
height = window.innerHeight*0.6
margin = {top:80, bottom:40, left:350, right:360} ,


/* LOAD DATA */

// import {Legend, Swatches} from "@d3/color-legend"
d3.csv('../data/Import.csv', d => {
  return {
    year: new Date(+d.Year, 0, 1),
    country: d.Country,
    value: + d.FoodValue 
  }
})
.then(data => {
  console.log('data :>> ', data);



  
    const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.value))
    .range([height - margin.bottom, margin.top]) 

    // const yScale = d3.scaleLinear()
    // .domain(0, d3.max(data, function (d)        {
    //   return d.value;
    // }))
    // .nice()
    // .range([height - margin.bottom, margin.top]) 


    const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.year))
    .range([margin.left, width - margin.right]) 

    // const xScale = d3.scaleTime()
    // .domain(d3.extent(data, function (d) {
    //   return d.year;
    // }))
    // // .nice()
    // .range([margin.left, width - margin.right]) 
    



    console.log(yScale.domain())
    console.log(xScale.domain())

    
  const xAxis = d3.axisBottom(xScale);
   const yAxis = d3.axisLeft(yScale);
   

//   // CREATE SVG ELEMENT

  let svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

   

//   // BUILD AND CALL AXES

//   // LINE GENERATOR FUNCTION

//   // DRAW LINE

  const line = d3.line() 
  .x(d=> xScale(d.year))
  .y(d=> yScale(d.value))



    

    const myColor = d3.scaleOrdinal()
    // .domain(data)
    .domain(["Canada", "China", "Italy", "Mexico", "Singapore", "France"])
      //  .range(d3.schemeSet1)
       .range(["purple", "green", "white", "blue", "red", "black"])


   const colorScale =  d3.scaleOrdinal()
   .domain(["Canada", "China", "Italy", "Mexico", "Singapore", "France"])
  //  .range(d3.schemeSet1)
   .range(["purple", "green", "white", "blue", "red", "black"])
      
  
   
   
  //   const colorScale = d3.scaleOrdinal().domain(data)
  //   // .domain(["Canada", "China", "Italy", "Mexico", "Singapore", "France"])
  // .range([ "rgb(153, 107, 195)", "rgb(56, 106, 197)", "rgb(93, 199, 76)", "rgb(223, 199, 31)", "rgb(234, 118, 47), rgb(255,127,80)"]);


    
    const groupeData = d3.groups(data, d => d.country)
    console.log(groupeData)


  
  const path = svg.selectAll("path")
  .data(groupeData)
    .join("path")
    // .attr("class", d => d.country)
    .attr("d", ([country, data]) => line(data))
   .attr("stroke", function(d){return myColor(d)})
   .attr("stroke-width", "4px")
   .attr("fill", "none")
   
  //  svg
  //  // First we need to enter in a group
  //  .selectAll("myDots")
  //  .data(groupeData)
  //  .enter()
  //    .append('g')
  //    .style("fill", function(d){ return myColor(d) })
  //  // Second we need to enter in the 'values' part of this group
  //  .selectAll("myPoints")
  //  .data(function(d){ return data })
  //  .enter()
  //  .append("circle")
  //    .attr("cx", function(d) { return x(d.year) } )
  //    .attr("cy", function(d) { return y(d.value) } )
  //    .attr("r", 5)
  //    .attr("stroke", "white")


   
  //  .append("circle")
  //  .attr("r", 2)
  //  .attr("cx", d => xScale(d.Year))
  //   .attr("cy", d => yScale(d.FoodValue))

    // svg
    // .append("g")
    // .selectAll("dot")
    // .data(Gr)
    // .enter()
    // .append("circle")
    //   .attr("cx", function(d) { return x(d.Year) } )
    //   .attr("cy", function(d) { return y(d.FoodValue) } )
    //   .attr("r", 5)
    //   .attr("fill", "#69b3a2")

  
  svg.append("g")
 .style("transform", `translate( 0px, ${height - margin.bottom}px)`)
//  .call(xAxis);
 .call(xAxis.ticks(d3.timeYear));


 svg.append("text")
 .attr("class", "x label")
 .attr("text-anchor", "end")
 .attr("font-size", "1.4em")
//  .attr("font-width", "10px")
//  .style("fontWeight", "bolder")
 .attr("x", width - margin.right+70)
 .attr("y", height -400)
 .text("6 countries with the highest import values 2017-2020");

 svg.append("text")
 .attr("class", "x label")
 .attr("text-anchor", "end")
 .attr("x", width - margin.right-150)
 .attr("y", height -3)
 .text("Year");

 svg.append("g")
 .style("transform", `translate( ${margin.left}px, 0px)`)
 .call(yAxis);
  
 svg.append("text")
 .attr("class", "y label")
 .attr("text-anchor", "end")
 .attr("x", width - 1250)
 .attr("y", height - 200)
 .attr("dy", "1em")
 .attr("transform", "rotate(-90)")
 .text("Import (Million $)");


//  svg.append("text")
//  .attr("class", "country-label1")
//  .attr("font-size", ".9em")
//  .attr("text-anchor", "end")
//  .attr("x", width -10)
//  .attr("y", height-240)
//  .text("Canada");


//  svg.append("text")
//  .attr("class", "country-label2")
//  .attr("font-size", ".9em")
//  .attr("text-anchor", "end")
//  .attr("x", width + 1)
//  .attr("y", height - 110)
//  .text("Colombia");


//  svg.append("text")
//  .attr("class", "country-label3")
//  .attr("font-size", ".9em")
//  .attr("text-anchor", "end")
//  .attr("x", width -20)
//  .attr("y", height - 50)
//  .text("China");



 const legend1 = d3.legendColor()
 .scale(colorScale)
 .shape('circle')
//  .cells([1, 2, 3, 4, 5, 6])
 .labelOffset(20)
 .shapePadding(15)
 .orient('horisontal')
 .labelFormat(d3.format(".0f"));
//  .title("Country");

 svg.append("g")
 // .attr("class", "p")
 .attr("transform", `translate(${height+350}, 200)`)
 // .style("font-size", "1em")
 // .title("Pollution Health Risk (high - low)")
 .call(legend1);

});



//  var svg = d3.select("svg");

// svg.append("g")
//   .attr("class", "legendOrdinal")
//   .attr("transform", `translate(${height+450},20)`);

// const legendOrdinal = d3.legendColor()
//   //d3 symbol creates a path-string, for example
//   //"M0,-8.059274488676564L9.306048591020996,
//   //8.059274488676564 -9.306048591020996,8.059274488676564Z"
//   .shape("path", d3.symbol().type(d3.symbolCircle).size(150)())
//   .shapePadding(10)
//   .on("cellclick", function(d){alert("clicked " + d);})
//   //use cellFilter to hide the "e" cell
//   // .cellFilter(function(d){ return d.country !== "France" })
//   .scale(colorScale);

// svg.select(".legendOrdinal")
//   .call(legendOrdinal);

// svg.append("g")
//     // .attr("class", "p")
//     .attr("transform", `translate(${height+450}, 100)`)
   
//     .call(legendOrdinal);

// Swatches(d3.scaleOrdinal(["Wholesale and Retail Trade", "Manufacturing", "Leisure and hospitality", "Business services", "Construction", "Education and Health", "Government", "Finance", "Self-employed", "Other"], d3.schemeTableau10), {
//   columns: "180px"
// });


d3.csv('../data/Immigration.csv', d => {
  return {
    year: new Date(+d.Year, 0, 1),
    country: d.Country,
    number: + d.Num
  }
})
.then(data1 => {
  console.log('data :>> ', data1);



  
    const yScale = d3.scaleLinear()
    .domain(d3.extent(data1, d => d.number))
    .range([height - margin.bottom, margin.top]) 

    // const yScale = d3.scaleLinear()
    // .domain(0, d3.max(data, function (d)        {
    //   return d.value;
    // }))
    // .nice()
    // .range([height - margin.bottom, margin.top]) 


    const xScale = d3.scaleTime()
    .domain(d3.extent(data1, d => d.year))
    .range([margin.left, width - margin.right]) 

    // const xScale = d3.scaleTime()
    // .domain(d3.extent(data, function (d) {
    //   return d.year;
    // }))
    // // .nice()
    // .range([margin.left, width - margin.right]) 
    



    console.log(yScale.domain())
    console.log(xScale.domain())

    
  const xAxis = d3.axisBottom(xScale);
   const yAxis = d3.axisLeft(yScale);
   

//   // CREATE SVG ELEMENT

  let svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

   

//   // BUILD AND CALL AXES

//   // LINE GENERATOR FUNCTION

//   // DRAW LINE

  const line = d3.line() 
  .x(d=> xScale(d.year))
  .y(d=> yScale(d.number))



    

    const myColor = d3.scaleOrdinal()
    // .domain(data)
    .domain(["India", "China", "Philippines", "Mexico", "Dominican Republic", "Cuba"])
    .range(["yellow", "Fuchsia", "lime", "orange", "brown", "grey"])
      //  .range(d3.schemeSet3)


   const colorScale =  d3.scaleOrdinal()
   .domain(["India", "China", "Philippines", "Mexico", "Dominican Republic", "Cuba"])
  //  .range(d3.schemeSet3)
   .range(["yellow", "Fuchsia", "lime", "orange", "brown", "grey"])
      
  
   
   
  //   const colorScale = d3.scaleOrdinal().domain(data)
  //   // .domain(["Canada", "China", "Italy", "Mexico", "Singapore", "France"])
  // .range([ "rgb(153, 107, 195)", "rgb(56, 106, 197)", "rgb(93, 199, 76)", "rgb(223, 199, 31)", "rgb(234, 118, 47), rgb(255,127,80)"]);


    
    const groupeData1 = d3.groups(data1, d => d.country)
    console.log(groupeData1)


  
  const path = svg.selectAll("path")
  .data(groupeData1)
    .join("path")
    // .attr("class", d => d.country)
    .attr("d", ([country, data1]) => line(data1))
   .attr("stroke", function(d){return myColor(d)})
   .attr("stroke-width", "4px")
   .attr("fill", "none")
   .selectAll("myPoints")
      .data(groupeData1)
      .append("circle")
        .attr("cx", function(d) { return x(d.year) } )
        .attr("cy", function(d) { return y(d.value) } )
        .attr("r", 5)
        .attr("stroke", "white")


  //  const dot = svg
  //  .selectAll("circle")
  //  .data(groupeData1, d => d.RowNum)
  //  .join("circle")
  //    // .attr("r", 0)
  //    // .call(sel => sel.transition()
  //    //   .duration(1000)
  //    //   .delay( d => d.FoodValue*500)
  //      // .attr("r", 20)),
  //      // .attr("r", d => sqrtScale(d.PopDensityperMi2)))
  //      .attr("r", 30)

  //      .attr("class", "dot")
  //     //  .attr("stroke", "black")
  //     //  .attr("stroke-width", "1px")
  //  .attr("cx", d => xScale(d.Num))
  //  .attr("cy", d => yScale(d.FoodValue))
  //  .attr("fill", d => colorScale(d.Country)),

  
  svg.append("g")
 .style("transform", `translate( 0px, ${height - margin.bottom}px)`)
//  .call(xAxis);
 .call(xAxis.ticks(d3.timeYear));


 svg.append("text")
 .attr("class", "x label")
 .attr("text-anchor", "end")
 .attr("font-size", "1.4em")
//  .attr("font-width", "10px")
//  .style("fontWeight", "bolder")
 .attr("x", width - margin.right+110)
 .attr("y", height -400)
 .text("6 countries with the highest number of immigrants 2017-2020");


 svg.append("text")
 .attr("class", "x label")
 .attr("text-anchor", "end")
 .attr("x", width - margin.right-150)
 .attr("y", height -3)
 .text("Year");

 svg.append("g")
 .style("transform", `translate( ${margin.left}px, 0px)`)
 .call(yAxis);
  
 svg.append("text")
 .attr("class", "y label")
 .attr("text-anchor", "end")
 .attr("x", width - 1250)
 .attr("y", height - 200)
 .attr("dy", "1em")
 .attr("transform", "rotate(-90)")
 .text("Immigrants (number)");


//  svg.append("text")
//  .attr("class", "country-label1")
//  .attr("font-size", ".9em")
//  .attr("text-anchor", "end")
//  .attr("x", width -10)
//  .attr("y", height-240)
//  .text("Canada");


//  svg.append("text")
//  .attr("class", "country-label2")
//  .attr("font-size", ".9em")
//  .attr("text-anchor", "end")
//  .attr("x", width + 1)
//  .attr("y", height - 110)
//  .text("Colombia");


//  svg.append("text")
//  .attr("class", "country-label3")
//  .attr("font-size", ".9em")
//  .attr("text-anchor", "end")
//  .attr("x", width -20)
//  .attr("y", height - 50)
//  .text("China");



 const legend1 = d3.legendColor()
 .scale(colorScale)
 .shape('circle')
//  .cells([1, 2, 3, 4, 5, 6])
 .labelOffset(20)
 .shapePadding(15)
 .orient('horisontal')
 .labelFormat(d3.format(".0f"));
//  .title("Country");

 svg.append("g")
 // .attr("class", "p")
 .attr("transform", `translate(${height+350}, 200)`)
 // .style("font-size", "1em")
 // .title("Pollution Health Risk (high - low)")
 .call(legend1);


})



/* CONSTANTS AND GLOBALS */
const width2 = window.innerWidth*0.8;
 const height2 = window.innerHeight*0.8;
// const  height2 = 800;
  margin2 = {top:100, bottom:60, left:200, right:100} ;
  // radius = 5;


  // these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;
let colorScale;
// let sqrtScale;


/* APPLICATION STATE */
let state = {
  data: [],
  selectedYear: "2017" // + YOUR INITIAL FILTER SELECTION
};


/* LOAD DATA */
d3.json("../data/ImportImmigration.json", d3.autoType).then(raw_data => {
  // + SET YOUR DATA PATH
  console.log("data", raw_data);
  // save our data to application state
  state.data = raw_data;
  init();
});

function init() {
  // + SCALES
  xScale = d3.scaleLinear()
  .domain(d3.extent(state.data, d => d.Num*0.7))
  // .domain(d3.extent(state.data, d = d.PercentForestCover))
  .range([margin2.left, width2 - margin2.right]) 

  yScale = d3.scaleLinear()
    // .domain([0,55])
    .domain(d3.extent(state.data, d => d.FoodValue*0.7))
    .range([height2 - margin2.bottom, margin2.top]) 

    console.log(xScale.domain())
    console.log(yScale.domain())

    colorScale = d3.scaleOrdinal()
    .domain(["India", "China", "Philippines", "Mexico", "Dominican Republic", "Canada", "Italy", "Singapore", "France"]) 
    // .range(d3.schemeSet2);
    .range(["#20B2AA", "#32CD32", "#9370DB", "#FFD700", "#808000", "#FF1493", "#FA8072", "#FFFFCC", "#4682B4"]);
  // Canada = #FF1493, India = #20B2AA,  Mexico = #FFD700 France = #4682B4 China = #32CD32 Italy = #FA8072 Philippines = #9370DB
  // Dominican Republic = #808000  Singapore = #ADFF2F
  
  // sqrtScale = d3.scaleSqrt()

    // .domain([0, 100])
    // .range([0, 11]); 

    // + AXES


   
    // const xAxis = d3.axisBottom(xScale);
    // const yAxis = d3.axisLeft(yScale);



    const selectElement = d3.select("#dropdown")
 .on("change", (event) => {

  console.log("prev", state)

  state.selectedYear = event.target.value;
//  console.log("selected", event.target.value)
 console.log("post", state)
 draw();

})
console.log(selectElement)

    svg = d3.select("#container")
  .append("svg")
  .attr("width", width2)
  .attr("height", height2)
  // .style("background-color", "rgb(182, 242, 242)")


  const xAxis = d3.axisBottom(xScale)
  svg.append("g")
    .attr("transform", `translate(${0},${height2 - margin2.bottom})`)
    .style("color", "#676767")
    .call(xAxis);

  const yAxis = d3.axisLeft(yScale)
  svg.append("g")
    .attr("transform", `translate(${margin2.left},${0})`)
    .style("color", "#676767")
    .call(yAxis);

  draw();
 };

 function draw() {


  const filteredData = state.data
  .filter(d => state.selectedYear === "All" || state.selectedYear === d.Year)

  const dot = svg
    .selectAll("circle")
    .data(filteredData, d => d.RowNum)
    .join(
      // + HANDLE ENTER SELECTION
       enter => enter.append("circle")
      // .attr("r", 0)
      // .call(sel => sel.transition()
      //   .duration(1000)
      //   .delay( d => d.FoodValue*500)
        // .attr("r", 20)),
        // .attr("r", d => sqrtScale(d.PopDensityperMi2)))
        .attr("r", 20))

        .attr("class", "dot")
        .attr("stroke", "white")
        .attr("stroke-width", "1px")
    .attr("cx", d => xScale(d.Num*0.7))
    .attr("cy", d => yScale(d.FoodValue*0.7))
    .attr("fill", d => colorScale(d.Country),
    // .attr("opacity", "0"),
    // .attr("opacity", "70"),
    // .style("background-color", "rgb(141, 233, 233)"), 
    
          // + HANDLE UPDATE SELECTION
          update => update,

          // + HANDLE EXIT SELECTION
          exit => exit);

    // + CALL AXES



  //   const xAxis = svg.append("g")
  //   .attr("class", 'xAxis')
  //   .attr("transform", `translate(${0}, ${height2 - margin2.bottom})`) 
  //   .call(xAxis)

  // const yAxis = svg.append("g")
  //   .attr("class", 'yAxis')
  //   .attr("transform", `translate(${margin2.left}, ${0})`)
  //   .call(yAxis)


  // svg.append("g")
  // .style("transform", `translate( 0px, ${height2 - margin2.bottom}px)`)
  //  .call(xAxis),
   
 
      svg.append("text")
     .attr("class", "x label")
     .attr("text-anchor", "end")
     .attr("x", width2 - 500)
     .attr("y", height2 -3)
     .text("Immigrants (number*0.7)"),
 
 
 
//   svg.append("g")
//  //  .style("transform", 'translate( 50px, 0px)')
//   .style("transform", `translate( ${margin2.left}px, 0px)`)
//   .call(yAxis),
 
  svg.append("text")
     .attr("class", "y label")
     .attr("text-anchor", "end")
     .attr("x", height2 - 800)
     .attr("y", width2-1150)
     .attr("dy", ".9em")
     .attr("transform", "rotate(-90)")
    //  .attr("stroke", "red")
     .text("Import (Milion $*0.7)"),

     

     
     svg.append("text")
     .attr("class", "x label")
     .attr("text-anchor", "end")
     .attr("x", width2 - 1100)
     .attr("y", height2 -550)
     .attr("fill", "#FF1493")
     .attr("font-size", "1.5em")
     .attr("font-width", "3px")
     .text("Canada"),

     svg.append("text")
     .attr("class", "x label")
     .attr("text-anchor", "end")
     .attr("x", width2 - 1000)
     .attr("y", height2 -550)
     .attr("fill", "#20B2AA")
     .attr("font-size", "1.5em")
     .attr("font-width", "3px")
     .text("India"),

     svg.append("text")
     .attr("class", "x label")
     .attr("text-anchor", "end")
     .attr("x", width2 - 900)
     .attr("y", height2 -550)
     .attr("fill", "#FFD700")
     .attr("font-size", "1.5em")
     .attr("font-width", "3px")
     .text("Mexico"),

     svg.append("text")
     .attr("class", "x label")
     .attr("text-anchor", "end")
     .attr("x", width2 - 800)
     .attr("y", height2 -550)
     .attr("fill", "#4682B4")
     .attr("font-size", "1.5em")
     .attr("font-width", "3px")
     .text("France"),

     svg.append("text")
     .attr("class", "x label")
     .attr("text-anchor", "end")
     .attr("x", width2 - 700)
     .attr("y", height2 -550)
     .attr("fill", "#32CD32")
     .attr("font-size", "1.5em")
     .attr("font-width", "3px")
     .text("China"),

     svg.append("text")
     .attr("class", "x label")
     .attr("text-anchor", "end")
     .attr("x", width2 - 600)
     .attr("y", height2 -550)
     .attr("fill", "#FA8072")
     .attr("font-size", "1.5em")
     .attr("font-width", "3px")
     .text("Italy"),

     svg.append("text")
     .attr("class", "x label")
     .attr("text-anchor", "end")
     .attr("x", width2 - 450)
     .attr("y", height2 -550)
     .attr("fill", "#9370DB")
     .attr("font-size", "1.5em")
     .attr("font-width", "3px")
     .text("Philippines"),

     svg.append("text")
     .attr("class", "x label")
     .attr("text-anchor", "end")
     .attr("x", width2 - 200)
     .attr("y", height2 -550)
     .attr("fill", "#808000")
     .attr("font-size", "1.5em")
     .attr("font-width", "3px")
     .text("Dominican Republic"),

     svg.append("text")
     .attr("class", "x label")
     .attr("text-anchor", "end")
     .attr("x", width2 -50 )
     .attr("y", height2 -550)
     .attr("fill", "#FFFFCC")
    //  .attr("stroke", "white")
     .attr("font-size", "1.5em")
     .attr("font-width", "3px")
     .text("Singapore"),
 

     svg.append("text")
     .attr("class", "x label")
     .attr("text-anchor", "end")
     .attr("x", width2 )
     .attr("y", height2 -500)
    //  .attr("fill", "#ADFF2F")
    //  .attr("font-size", "1.5em")
     .attr("font-width", "3px")
     .text("*Cuba is not included, sicne there is no trade with the USA")
 
     



 }