mapboxgl.accessToken = 'pk.eyJ1IjoicG9seWF2ZXIiLCJhIjoiY2xoNW9mdDE4MDJ2YjNjazl6Njlhang0aCJ9.frpQYiW3YKTgw3heSuNEQg';

// pk.eyJ1IjoicG9seWF2ZXIiLCJhIjoiY2xoNW9mdDE4MDJ2YjNjazl6Njlhang0aCJ9.frpQYiW3YKTgw3heSuNEQg


// Create a new map.
const map = new mapboxgl.Map({
    container: 'map',
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    // mapbox://styles/polyaver/clhf42qao029i01qm60n88e3e
    // style: 'mapbox://styles/polyaver/clh5ooiyp01cs01pf6zpz0ptt',
    style: 'mapbox://styles/polyaver/clhu2zdh701yv01p66snihwmk',
        // style: 'mapbox://styles/polyaver/clhf42qao029i01qm60n88e3e',
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
      

      "Republic of Buryatia",
	"Republic of Tuva",	"Zabaykalsky Krai",	"Krasnoyarsk Krai",	"Irkutsk Oblast",	"Sakha Republic (Yakutia)",	"Kamchatka Krai",	"Primorsky Krai",	"Khabarovsk Krai",	"Amur Oblast",	"Magadan Oblast",	"Sakhalin Oblast",	"Jewish Autonomous Oblast",	"Chukotka Autonomous Okrug",
  "Russia"
    ];
    const colors = [
      '#FFEDA0',
      '#b6fcfb',
      '#cac0fb',
      '#f6ccac',
      '#f8bae3',
      '#94f9d1',
      '#fa9c99',
      '#fcb1b1',
      '#daace7',
      '#94a9f4',
      '#d6f7ab',
      '#94f9d1',
      '#e2fecd',
      '#aae3fd',
      '#6a76b4'

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

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    map.on('mousemove', (event) => {
      const states = map.queryRenderedFeatures(event.point, {
        layers: ['choropleth-fill']
      });
      document.getElementById('pd').innerHTML = states.length
        ? `<strong>${states[0].properties.name}</strong><p><strong><em>${states[0].properties.density}</strong> % `
        : `<p><i>Hover over a highlighted federal subject!</i></p>`;
    });