/////////////////////////////////// VARIABLES //////////////////////////////


//display mouse position over map. 
var mousePositionControl = new ol.control.MousePosition({
  className: 'custom-mouse-position', // place the mouse position in a special div instead of on the map
  target: document.getElementById('mouse-position'),
  undefinedHTML: 'Mouse Coords : ',
});


var map_view = new ol.View({
    // center : [343434, 5744750],
    // zoom : 16,
    center: ol.proj.fromLonLat([3.0913,45.78063]), // [place delille]
    zoom: 16,
  });

///////////////////////////////////////// LAYERS ////////////////////////////////////////////////////////////////////////////////////////////////

// base map layer
var raster = new ol.layer.Tile({ 
    source: new ol.source.OSM(),
  });

///////////////  WMS LAYERS //////////////////////////

// geoserver WMS layer example
// var wms_src_lines = new ol.source.TileWMS({
//       url: 'http://localhost:8080/geoserver/AM_workspace/wms', // link to db [local geoserveur or serveur carto ign]
//       params: {'LAYERS': 'AM_workspace:lines', 'TILED': false},
//       serverType: 'geoserver',
//     });

// var wms_lines = new ol.layer.Tile({ 
//     extent: [341520, 5742997, 345218, 5746411], // clermont ! check layer bounds in geoserver for this.
//     source: wms_src_lines
//   });

// POINTS
// var wms_src_points = new ol.source.TileWMS({
//       url: 'http://localhost:8080/geoserver/AM_workspace/wms', // link to db [local geoserveur or serveur carto ign]
//       params: {'LAYERS': 'AM_workspace:points', 'TILED': false},
//       serverType: 'geoserver',
//     });

// var wms_points = new ol.layer.Tile({ 
//     extent: [341520, 5742997, 345218, 5746411], // clermont ! check layer bounds in geoserver for this.
//     source: wms_src_points
//   });

// POLYGON 
// var wms_src_polygon = new ol.source.TileWMS({
//       url: 'http://localhost:8080/geoserver/AM_workspace/wms', // link to db [local geoserveur or serveur carto ign]
//       params: {'LAYERS': 'AM_workspace:polygon', 'TILED': false},
//       serverType: 'geoserver',
//     });

// var wms_polygon = new ol.layer.Tile({ 
//     extent: [341520, 5742997, 345218, 5746411], // clermont ! check layer bounds in geoserver for this.
//     source: wms_src_polygon
//   });


/////////////// WFS LAYERS /////////////////// 

// place D points
var wfs_src_pd_points = new ol.source.Vector({
  format: new ol.format.GeoJSON(),
  url: function (extent) {
    return (
      'http://localhost:8080/geoserver/AM_workspace/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=AM_workspace%3Apd_points&maxFeatures=50&outputFormat=application%2Fjson'+
      '&srsname=EPSG:3857&bbox='+ extent.join(',') +',EPSG:3857'
    );
  },
  strategy: ol.loadingstrategy.bbox,
});

var wfs_pd_points = new ol.layer.Vector({
  source: wfs_src_pd_points,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'rgba(0,0, 255, 1.0)', // selection will be in blue
      width: 3,
    }),
  }),
});

// place D lines
var wfs_src_pd_lines = new ol.source.Vector({
  format: new ol.format.GeoJSON(),
  url: function (extent) {
    return (
      'http://localhost:8080/geoserver/AM_workspace/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=AM_workspace%3Apd_lines&maxFeatures=50&outputFormat=application%2Fjson'+
      '&srsname=EPSG:3857&bbox='+extent.join(',') +',EPSG:3857'
    );
  },
  strategy: ol.loadingstrategy.bbox,
});

var wfs_pd_lines = new ol.layer.Vector({
  source: wfs_src_pd_lines,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'rgba(255,0, 0, 1.0)', // selection will be in red
      width: 3,
    }),
  }),
});


// place D polygons
var wfs_src_pd_polygons = new ol.source.Vector({
  format: new ol.format.GeoJSON(),
  url: function (extent) {
    return (
      'http://localhost:8080/geoserver/AM_workspace/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=AM_workspace%3Apd_polygons&maxFeatures=50&outputFormat=application%2Fjson'+
      '&srsname=EPSG:3857&bbox='+extent.join(',') +',EPSG:3857'
    );
  },
  strategy: ol.loadingstrategy.bbox,
});

var wfs_pd_polygons = new ol.layer.Vector({
  source: wfs_src_pd_polygons,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'rgba(0,255,0, 1.0)', // selection will be in green
      width: 3,
    }),
  }),
});

/// LINES ////// stuck in limbo?
// var wfs_src_lines = new ol.source.Vector({
//   format: new ol.format.GeoJSON(),
//   url: function (extent) {
//     return (
//       'http://localhost:8080/geoserver/AM_workspace/ows?service=WFS'+
//       '&version=1.0.0&request=GetFeature&typeName=AM_workspace:am_lines&'+
//       'maxFeatures=50&outputFormat=application%2Fjson'
//     );
//   }
// });

// var wfs_lines = new ol.layer.Vector({
//   source: wfs_src_lines,
//   style: new ol.style.Style({
//     stroke: new ol.style.Stroke({
//       color: 'rgba(255, 0, 0, 1.0)', // selection will be in red
//       width: 3,
//     }),
//   }),
// });

// // /// POINTS ???? not loading? !!!!
// var wfs_src_points = new ol.source.Vector({
//   format: new ol.format.GeoJSON({dataProjection: 'EPSG:3857'}),
//   url: function (extent) {
//     return (
//       'http://localhost:8080/geoserver/AM_workspace/ows?service=WFS&'+
//       'version=1.0.0&request=GetFeature&typeName=AM_workspace:am_points&'+
//       'maxFeatures=50&outputFormat=application%2Fjson'
//     );
//   }
// });

// var wfs_points = new ol.layer.Vector({
//   source: wfs_src_points,
//   style: new ol.style.Style({
//     stroke: new ol.style.Stroke({
//       color: 'rgba(0, 0, 255, 1.0)', // selection will be in blue
//       width: 2,
//     }),
//   }),
// });


/// POLYGON ////// loading but like... just a little bit..
// var wfs_src_polygon = new ol.source.Vector({
//   format: new ol.format.GeoJSON(),
//   url: function (extent) {
//     return (
//       'http://localhost:8080/geoserver/AM_workspace/ows?service=WFS&'+
//       'version=1.0.0&request=GetFeature&typeName=AM_workspace:am_polygon&'+
//       'maxFeatures=50&outputFormat=application%2Fjson'
//     );
//   }
// });

// var wfs_polygon = new ol.layer.Vector({
//   source: wfs_src_polygon,
//   style: new ol.style.Style({
//     stroke: new ol.style.Stroke({
//       color: 'rgba(0, 255, 0, 1.0)', // selection will be in green
//       width: 2,
//     }),
//   }),
// });


////////////////////////////////// MAP STARTUP /////////////////////////////////////////////
// add the layers to map
var map = new ol.Map({
  controls: ol.control.defaults().extend([mousePositionControl]), // add mouse position
  //layers: [raster,wms_polygon,wms_lines,wms_points], // layers stacked by order (arg0 under arg1 under arg2 etc)
  layers: [raster,wfs_pd_lines,wfs_pd_points,wfs_pd_polygons],
  target: 'map',
  view: map_view,
});


//////////////////////////////////// FUNCTIONS ///////////////////////////////////





/* display feature info on click [ WMS ]
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
        //console.log('html:',html);
      });
    //
  }
});
*/



