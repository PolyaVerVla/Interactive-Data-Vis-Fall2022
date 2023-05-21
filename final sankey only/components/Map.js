class MapBox { 

    constructor(state, setGlobalState) {

    

        mapboxgl.accessToken = 'pk.eyJ1IjoicG9seWF2ZXIiLCJhIjoiY2xoNW9mdDE4MDJ2YjNjazl6Njlhang0aCJ9.frpQYiW3YKTgw3heSuNEQg';

        // pk.eyJ1IjoicG9seWF2ZXIiLCJhIjoiY2xoNW9mdDE4MDJ2YjNjazl6Njlhang0aCJ9.frpQYiW3YKTgw3heSuNEQg


        // Create a new map.
        map = new mapboxgl.Map({
            container: 'map',
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            // mapbox://styles/polyaver/clhf42qao029i01qm60n88e3e
            // style: 'mapbox://styles/polyaver/clhcvgkd7026z01p4931sgyml',
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

            // const layers = [
            //     '0-10',
            //     '10-20',
            //     '20-50',
            //     '50-100',
            //     '100-200',
            //     '200-500',
            //     '500-1000',
            //     '1000+'
            // ];
            // const colors = [
            //     '#FFEDA0',
            //     '#FED976',
            //     '#FEB24C',
            //     '#FD8D3C',
            //     '#FC4E2A',
            //     '#E31A1C',
            //     '#BD0026',
            //     '#800026'
            // ];

            // const legend = document.getElementById('legend');

        // layers.forEach((layer, i) => {
        //     const color = colors[i];
        //     const item = document.createElement('div');
        //     const key = document.createElement('span');
        //     key.className = 'legend-key';
        //     key.style.backgroundColor = color;

        //     const value = document.createElement('span');
        //     value.innerHTML = `${layer}`;
        //     item.appendChild(key);
        //     item.appendChild(value);
        //     legend.appendChild(item);
        // });
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


  
}

  export {MapBox};
