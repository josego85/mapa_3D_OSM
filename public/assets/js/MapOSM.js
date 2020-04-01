//////////////////////////////////////////////////////////
// Mapa que muestra datos OSM.
//////////////////////////////////////////////////////////
var map = null;

function loadMap()
{
    mapboxgl.accessToken = ACCESS_TOKEN_MAPBOX;

    if (!mapboxgl.supported())
    {
        alert('Your browser does not support Mapbox GL');
    }
    else
    {
        createMap();
    }
}

function createMap ()
{
    map = new mapboxgl.Map(
    {
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        center:
        [
            DEFAULT_LNG,
            DEFAULT_LAT
        ],
        zoom: 15.5,
        pitch: 45,              // Inclinacion inicial de la camara.
        bearing: -17.6,         // Rotacion inicial de la camara.
        antialias: true,        // Suavizado. Si se activa influye en el rendimiento.
        attribution: '© Data <a href="https://openstreetmap.org/copyright/">OpenStreetMap</a> © Map <a href="https://mapbox.com/">Mapbox</a> © 3D <a href="https://osmbuildings.org/copyright/">OSM Buildings</a>'
    });
    addControls();

    map.on('load', function()
    {
        map.addLayer(
        {
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint':
            {
                'fill-extrusion-color': '#9c9c9c',
                'fill-extrusion-height':
                [
                    'get',
                    'height'
                ],
                'fill-extrusion-base': 
                [
                    'get',
                    'min_height'
                ],
                'fill-extrusion-opacity': 0.6
            }
        });

        map.on('click', '3d-buildings', function(e)
        {
            let properties = e.features[0].properties;
            let type = properties.type;
            let height = properties.height;
            let html = 'Es un ' + type + ' con una altura de ' + height + ' metros.';

            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(html)
                .addTo(map);
        });

        map.on('mouseenter', '3d-buildings', function()
        {
            map.getCanvas().style.cursor = 'pointer';
        });
            
        map.on('mouseleave', '3d-buildings', function()
        {
            map.getCanvas().style.cursor = '';
        });
    });
}

function addControls()
{
    map.addControl(new mapboxgl.GeolocateControl());
    map.addControl(new mapboxgl.FullscreenControl());
	map.addControl(new mapboxgl.NavigationControl());
}