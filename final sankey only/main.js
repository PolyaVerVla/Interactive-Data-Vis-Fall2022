


import { Sankey } from "./components/Sankey.js";

let   sankey;

// global state
let state = {
  data: [],
  domain: [],
  selectedState: null,
  selectedMetric: null,
};



  init();
// });

function init() {
 
  sankey = new Sankey(state, setGlobalState);
 
  draw();
}

function draw() {
 
  sankey.draw(state, setGlobalState);
}

// UTILITY FUNCTION: state updating function that we pass to our components so that they are able to update our global state object
function setGlobalState(nextState) {
  state = { ...state, ...nextState };
  console.log("new state:", state);
  draw();
}


  