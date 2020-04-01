//////////////////////////////////////////////////////////
// Mapa que muestra datos geográficos.
//////////////////////////////////////////////////////////
var map = null;

function loadMap()
{
	createMap();

	map.on('load', function()
	{
		map.addSource('layer-asu',
		{
			'type': 'geojson',
			'data': 'assets/data/BuildingsAsu.geojson'
		});

		map.addLayer(
		{
			'id': 'layer-asu',
			'type': 'fill-extrusion',
			'filter': ['has', 'height'],
			"source": "layer-asu",
			'paint': {
				'fill-extrusion-color': ["get", "color"],
				'fill-extrusion-height': ["get", "height"],
				'fill-extrusion-opacity': 0.6
			}
		});

		map.on('click', 'layer-asu', function(e)
        {
            let properties = e.features[0].properties;
            let height = properties.height;
            let html = 'Altura de ' + height + ' metros.';

            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(html)
                .addTo(map);
        });

        map.on('mouseenter', 'layer-asu', function()
        {
            map.getCanvas().style.cursor = 'pointer';
        });
            
        map.on('mouseleave', 'layer-asu', function()
        {
            map.getCanvas().style.cursor = '';
        });
	});
}

function createMap ()
{
	let lng = DEFAULT_LNG;
	let lat = DEFAULT_LAT;
	let zoom = 17;

	mapboxgl.accessToken = ACCESS_TOKEN_MAPBOX;

	map = new mapboxgl.Map(
	{
		container: 'map',
		center: [lng, lat],
		zoom: zoom,
		style: 'mapbox://styles/mapbox/streets-v11',
		pitch: 45,              // Inclinacion inicial de la camara.
        bearing: -17.6,         // Rotacion inicial de la camara.
        antialias: true,        // Suavizado. Si se activa influye en el rendimiento.
        attribution: '© Data <a href="https://openstreetmap.org/copyright/">OpenStreetMap</a> © Map <a href="https://mapbox.com/">Mapbox</a> © 3D <a href="https://osmbuildings.org/copyright/">OSM Buildings</a>'
	});
}