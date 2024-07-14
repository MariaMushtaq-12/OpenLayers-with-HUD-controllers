var mapView = new ol.View({
    center: ol.proj.fromLonLat([70, 30]),
    zoom: 5,
});

var map = new ol.Map({
    target: 'map',
    view: mapView,
});

var hudControl = new ol.control.Control({
    element: document.getElementById('hud'),
});
map.addControl(hudControl);

var osmTile = new ol.layer.Tile({
    title: 'Open Street Map',
    visible: true,
    source: new ol.source.OSM(),
});

map.addLayer(osmTile);

var PakistanDistrictTile = new ol.layer.Tile({
    title: 'Pakistan Districts',
    source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/task1/wms',
        params: {'LAYERS': 'task1:PAK_adm3', 'TILED': true},
        serverType: 'geoserver',
        visible: true,
    }),
});

map.addLayer(PakistanDistrictTile);

var resetButton = document.getElementById('reset-button');

resetButton.addEventListener('click', function() {
    mapView.setCenter(ol.proj.fromLonLat([70, 30]));
    mapView.setZoom(5);
});

var coordinatesElement = document.getElementById('coordinates');
coordinatesElement.style.backgroundColor = 'rgba(200, 200, 255, 0.8)'; // Light purple background

map.on('pointermove', function(event) {
    var coordinates = ol.proj.toLonLat(event.coordinate);
    var lon = coordinates[0].toFixed(2);
    var lat = coordinates[1].toFixed(2);
    coordinatesElement.innerText = 'Coordinates: ' + lon + ', ' + lat;
});
