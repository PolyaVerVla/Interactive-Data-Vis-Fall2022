class MapBox {


    constructor(state, setGlobalState) {
        // initialize properties here
    //     this.width = window.innerWidth * 0.6;
    //     this.height = window.innerHeight * 0.6;
    //     this.margins = { top: 20, bottom: 20, left: 20, right: 20 };
    //     this.duration = 1000;
    //     // this.format = d3.format(",." + d3.precisionFixed(1) + "f");
    // console.log('hallo')
    //     this.svg = d3
    //       .select("#sankey")
    //       .append("svg")
    //       .attr("width", this.width)
    //       .attr("height", this.height);
     

// mapboxgl.accessToken = 'pk.eyJ1IjoicG9seWF2ZXIiLCJhIjoiY2xoNW9mdDE4MDJ2YjNjazl6Njlhang0aCJ9.frpQYiW3YKTgw3heSuNEQg';
//     // Create a new map.
//      map = new mapboxgl.Map({
//         container: 'map',
//         // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
//         style: 'mapbox://styles/mapbox/streets-v12',
//         center: [-100.04, 38.907],
//         zoom: 3
//     });

//     map.on('load', () => {
//         // Add a source for the state polygons.
//         map.addSource('states', {
//             'type': 'geojson',
//             'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/ne_110m_admin_1_states_provinces_shp.geojson'
//         });

//         // Add a layer showing the state polygons.
//         map.addLayer({
//             'id': 'states-layer',
//             'type': 'fill',
//             'source': 'states',
//             'paint': {
//                 'fill-color': 'rgba(200, 100, 240, 0.4)',
//                 'fill-outline-color': 'rgba(200, 100, 240, 1)'
//             }
//         });

//         // When a click event occurs on a feature in the states layer,
//         // open a popup at the location of the click, with description
//         // HTML from the click event's properties.
//         map.on('click', 'states-layer', (e) => {
//             new mapboxgl.Popup()
//                 .setLngLat(e.lngLat)
//                 .setHTML(e.features[0].properties.name)
//                 .addTo(map);
//         });

//         // Change the cursor to a pointer when
//         // the mouse is over the states layer.
//         map.on('mouseenter', 'states-layer', () => {
//             map.getCanvas().style.cursor = 'pointer';
//         });

//         // Change the cursor back to a pointer
//         // when it leaves the states layer.
//         map.on('mouseleave', 'states-layer', () => {
//             map.getCanvas().style.cursor = '';
//         });
//     };)
// }


mapboxgl.accessToken = pk.eyJ1IjoicG9seWF2ZXIiLCJhIjoiY2xoNW9mdDE4MDJ2YjNjazl6Njlhang0aCJ9.frpQYiW3YKTgw3heSuNEQg;

// pk.eyJ1IjoicG9seWF2ZXIiLCJhIjoiY2xoNW9mdDE4MDJ2YjNjazl6Njlhang0aCJ9.frpQYiW3YKTgw3heSuNEQg


// Create a new map.
map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    // mapbox://styles/polyaver/clhf42qao029i01qm60n88e3e
    // style: 'mapbox://styles/polyaver/clhcvgkd7026z01p4931sgyml',
    style: 'mapbox://styles/polyaver/clhf42qao029i01qm60n88e3e',
    center: [109.04, 60.907],
    zoom: 2.7
});

// let hoveredStateId = null;

map.on('load', () => {
    // Add a source for the state polygons.
    // map.addSource('states', {
    //     'type': 'geojson',
    //     'data': "./russia-with-regions_1507.geojson"
    map.getCanvas().style.cursor = 'default';

    const layers = [
      '0-10',
      '10-20',
      '20-50',
      '50-100',
      '100-200',
      '200-500',
      '500-1000',
      '1000+'
    ];
    const colors = [
      '#FFEDA0',
      '#FED976',
      '#FEB24C',
      '#FD8D3C',
      '#FC4E2A',
      '#E31A1C',
      '#BD0026',
      '#800026'
    ];

    const legend = document.getElementById('legend');

layers.forEach((layer, i) => {
  const color = colors[i];
  const item = document.createElement('div');
  const key = document.createElement('span');
  key.className = 'legend-key';
  key.style.backgroundColor = color;

  const value = document.createElement('span');
  value.innerHTML = `${layer}`;
  item.appendChild(key);
  item.appendChild(value);
  legend.appendChild(item);
});
    });

///////////////////////////////////////////////////////////////////////////////////////////////////////////
    map.on('mousemove', (event) => {
      const states = map.queryRenderedFeatures(event.point, {
        layers: ['choropleth-fill']
      });
      document.getElementById('pd').innerHTML = states.length
        ? `<h3>${states[0].properties.name}</h3><p><strong><em>${states[0].properties.density}</strong> people per square mile</em></p>`
        : `<p>Hover over a state!</p>`;
    });

}
export {MapBox};