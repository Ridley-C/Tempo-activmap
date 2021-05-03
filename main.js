/////////////////////////////////// VARIABLES //////////////////////////////

//display mouse position over map. 
var mousePositionControl = new ol.control.MousePosition({
  className: 'custom-mouse-position', // place the mouse position in a special div instead of on the map
  target: document.getElementById('mouse-position'),
  undefinedHTML: 'Mouse Coords : ',
});

// base map layer
var raster =new ol.layer.Tile({ 
    source: new ol.source.OSM(),
  });

var map_view = new ol.View({
    center : [343434, 5744750],
    zoom : 16,
    //center: ol.proj.fromLonLat([3.0913,45.78063]), // [place delille]
    //zoom: 16,
  });


//////////////////////////////////// ADD LAYERS //////////////////////////////////////////////


//POINTS : geoserver link
var imgsrc_points = new ol.source.TileWMS({
      url: 'http://localhost:8080/geoserver/AM_workspace/wms', // link to db [serveur carto ign]
      params: {'LAYERS': 'AM_workspace:planet_osm_point', 'TILED': false},
      serverType: 'geoserver',
      //crossOrigin: 'anonymous', // THIS is supposed to help with CORS issues, but it stops me even loading the layers
    });
// Points Tile layer
var osm_points = new ol.layer.Tile({ 
    extent: [341520, 5742997, 345218, 5746411], // clermont ! check layer bounds in geoserver for this.
    source: imgsrc_points
  });


//LINES : geoserver link
var imgsrc_lines = new ol.source.TileWMS({
      url: 'http://localhost:8080/geoserver/AM_workspace/wms', 
      params: {'LAYERS': 'AM_workspace:planet_osm_line', 'TILED': false},
      serverType: 'geoserver',
      //crossOrigin: 'anonymous', // same here, this craetes a CORS issue on layer load
    });
// Lines Tile Layer
var osm_lines = new ol.layer.Tile({ 
    extent: [341520, 5742997, 345218, 5746411],
    source: imgsrc_lines
  });



// ************
// add the layers to map
var map = new ol.Map({
  controls: ol.control.defaults().extend([mousePositionControl]), // add mouse position
  layers: [raster,osm_lines,osm_points], // layers stacked by order (arg0 under arg1 under arg2 etc)
  target: 'map',
  view: map_view,
});


///////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////////////////////////////


// display feature info on click.
map.on('singleclick', function (evt) {
  document.getElementById('info').innerHTML = '';
  var viewResolution = map_view.getResolution();
  var url = imgsrc_points.getFeatureInfoUrl( //  here i have to choose 1 source? (points or lines for now)
    evt.coordinate, viewResolution, 'EPSG:3857',
    {'INFO_FORMAT': 'text/html'}
  );
  if (url) {
    console.log("fetching..");

    fetch(url) 
      .then(function (response) { return response.text(); })
      .then(function (html) {
        document.getElementById('info').innerHTML = ('Info :'+html);
        console.log('html:',html);
      });
    //
  }
});


