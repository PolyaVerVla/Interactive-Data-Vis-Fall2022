
/* CONSTANTS AND GLOBALS */
// const width = window.innerWidth*8;
const width = 600;
const height = innerHeight * .8;
const margin = 90;
/* LOAD DATA */
d3.csv('../data/10mountains.csv', d3.autoType)
  .then(data => {
    console.log("data", data)

    const svg = d3.select("#container").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("overflow", "visible")

    /* SCALES */
    /** This is where you should define your scales from data to pixel space */

    console.log(d3.extent(data.map(d => d.count)))


    const xScale = d3.scaleLinear()
    // .domain((d3.extent(data.map(d => d.count))))
    // .domain([0, d3.max(data, d => d.count)])
    .domain([0, Math.max(...data.map (d => d.count))])
    // .range([0, width ])
    // .range([ width, 0])
    .range([0, width])
    

    const yScale = d3.scaleBand()
    .domain((data.map(d => d.Mountain)))
    
    .range([height- margin, margin])

   

    // .range([0, height])
    .padding(0.1)

    const colorScale =  d3.scaleOrdinal(d3.schemeCategory10)
 .domain(["Mount Fuji", "Popocatepetl", "Lhotse", "Mount McKinley", "Kilimanjaro", "Mount Logan",
  "Kanchenjunga", "Aconcagua", "Mont Blanc", "Klyuchevskaya Sopka"])
 .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", 
 "#bcbd22", "#17becf"])

const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */

 svg.selectAll("rect.bar")
 .data(data)
 .join("rect")
 .attr("class", "bar")
 .attr("x", margin )
 .attr("y", d => yScale(d.Mountain))
 .attr("width", d => ( xScale(d.count)))
 .attr("height", yScale.bandwidth())
 .attr("fill", d => colorScale(d.Mountain))


 svg.append("g")
 .style("transform", `translate( ${margin}px, ${height-margin}px)`)
//  .style("transform", 'translate(0px, 470px)')
 .call(xAxis);
 svg.append("g")
//  .style("transform", 'translate( 90px, 0px)')
 .style("transform", `translate( ${margin}px, 0px)`)
 .call(yAxis);


      svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width - 200)
    .attr("y", 530)
    .text("Mountains height (m)");

 


  })
