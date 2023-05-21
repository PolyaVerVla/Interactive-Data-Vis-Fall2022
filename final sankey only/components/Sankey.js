class Sankey {


    
  constructor(state, setGlobalState) {
    // initialize properties here
    this.width = window.innerWidth * 0.6;
    this.height = window.innerHeight * 0.6;
    this.margins = { top: 20, bottom: 20, left: 20, right: 20 };
    this.duration = 1000;
    // this.format = d3.format(",." + d3.precisionFixed(1) + "f");
console.log('hallo')
    this.svg = d3
      .select("#sankey")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);
 
  
  
  
  //   }

  // d3.json('https://raw.githubusercontent.com/plotly/plotly.js/master/test/image/mocks/sankey_energy.json', function(fig){
    d3.json("./sankey_EasternSiberia.json", function(fig){
 
 let data = {
    type: "sankey",
    domain: {
      x: [0,1],
      y: [0,1]
    },
    orientation: "h",
    valueformat: ".0f",
    // valuesuffix: "TWh",
    node: {
      pad: 15,
      thickness: 15,
      line: {
        color: "black",
        width: 0.5
      },
     label: fig.data[0].node.label,
     color: fig.data[0].node.color
        },
  
    link: {
      source: fig.data[0].link.source,
      target: fig.data[0].link.target,
      value: fig.data[0].link.value,
      label: fig.data[0].link.label
    }
  }
  
   data = [data]
  
  var layout = {
    title: "Distribution of Minorities in Eastern Siberia",
    width: 1118,
    height: 772,
    font: {
      size: 10
    }
  }

  Plotly.react('myDiv', data, layout)
  // Plotly.newPlot('myDiv', data, layout)
  })}

}
export { Sankey } ;