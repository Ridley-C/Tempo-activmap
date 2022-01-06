

///////////////////////////////////////// LAYERS ////////////////////////////////////////////////////////////////////////////////////////////////

// base map layer
var raster = new ol.layer.Tile({ 
  source: new ol.source.OSM(),
});


///////////////  WMS LAYERS //////////////////////////

// geoserver WMS layer example
var wms_src_test = new ol.source.TileWMS({
    url: 'http://serveur-carto:8080/geoserver/activmap/wms', // link to db [local geoserveur]
    //url: 'http://localhost:8080/geoserver/AM_workspace/wms',
    params: {'LAYERS': 'activmap:small_test', 'TILED': false},
    serverType: 'geoserver',
  });

var wms_test = new ol.layer.Tile({ 
  extent: [341520, 5742997, 345218, 5746411], // clermont ! check layer bounds in geoserver for this.
  source: wms_src_test

});


/////////////// WFS LAYERS /////////////////// 

///// POINTS //////
var wfs_src_points = new ol.source.Vector({
format: new ol.format.GeoJSON({dataProjection: 'EPSG:3857'}),
url: 'http://serveur-carto:8080/geoserver/activmap/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=activmap%3Aam_points&maxFeatures=10000&outputFormat=application%2Fjson'
//url: 'http://localhost:8080/geoserver/AM_workspace/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=AM_workspace%3Aam_points&maxFeatures=1000000&outputFormat=application%2Fjson'
});

var wfs_points = new ol.layer.Vector({
source: wfs_src_points,
style: new ol.style.Style({ 
  image: new ol.style.Circle({
    radius: 5, // default radius is 0 so must define!!
    fill: new ol.style.Fill({color: 'rgba(50, 100, 250, 1.0)'}) // red
  }),
}),
});

/// LINES /////
var wfs_src_lines = new ol.source.Vector({
format: new ol.format.GeoJSON(),
url: 'http://serveur-carto:8080/geoserver/activmap/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=activmap%3Aam_lines&maxFeatures=10000&outputFormat=application%2Fjson'
//url: 'http://localhost:8080/geoserver/AM_workspace/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=AM_workspace%3Aam_lines&maxFeatures=1000000&outputFormat=application%2Fjson'
});

var wfs_lines = new ol.layer.Vector({
source: wfs_src_lines,
style: new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: 'rgba(255, 0, 0, 0.7)', // red
    width: 3,
  }),
}),
});


/////  POLYGON //////
var wfs_src_polygons = new ol.source.Vector({
format: new ol.format.GeoJSON(),
url: 'http://serveur-carto:8080/geoserver/activmap/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=activmap%3Aam_polygon&maxFeatures=10000&outputFormat=application%2Fjson'
//url: 'http://localhost:8080/geoserver/AM_workspace/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=AM_workspace%3Aam_polygon&maxFeatures=1000000&outputFormat=application%2Fjson'
});

var wfs_polygons = new ol.layer.Vector({
source: wfs_src_polygons,
style: new ol.style.Style({
  stroke: new ol.style.Stroke({color: 'rgba(40, 150, 40, 1.0)', width : 2}),
}),
});



// TEST 
var wfs_src_huge_test = new ol.source.Vector({
format : new ol.format.GeoJSON(),
url : 'http://serveur-carto:8080/geoserver/activmap/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=activmap%3Ahuge_test&maxFeatures=10000&outputFormat=application%2Fjson'
//url : 'http://localhost:8080/geoserver/AM_workspace/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=AM_workspace%3Atest&maxFeatures=1000000&outputFormat=application%2Fjson'
});

var wfs_huge_test = new ol.layer.Vector({
source: wfs_src_huge_test,
style: new ol.style.Style({ 
  image: new ol.style.Circle({
    radius: 5, // default radius is 0 so must define!!
    fill: new ol.style.Fill({color: 'rgba(50, 100, 250, 1.0)'}) // red
  }),
}),
});

// SMALL TEST 
var wfs_src_small_test = new ol.source.Vector({
format : new ol.format.GeoJSON(),
url : 'http://serveur-carto:8080/geoserver/activmap/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=activmap%3Asmall_test&maxFeatures=10000&outputFormat=application%2Fjson'
//url : 'http://localhost:8080/geoserver/AM_workspace/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=AM_workspace%3Asmall_test&maxFeatures=1000000&outputFormat=application%2Fjson'
});

var wfs_small_test = new ol.layer.Vector({
source: wfs_src_small_test,
style: new ol.style.Style({ 
  image: new ol.style.Circle({
    radius: 5, // default radius is 0 so must define!!
    fill: new ol.style.Fill({color: 'rgba(50, 100, 250, 1.0)'}) // red
  }),
}),
});


///////////////////// INTERACTIONS /////////////

var interaction;

var interactionSelectPointerMove = new ol.interaction.Select({
  condition: ol.events.condition.pointerMove
});

var interactionSelect = new ol.interaction.Select({
  style: new ol.style.Style({
      stroke: new ol.style.Stroke({
          color: '#FF2828'
      })
  })
});

var interactionSnap = new ol.interaction.Snap({
  source: wfs_src_points,
});

//display mouse position over map. 
var mousePositionControl = new ol.control.MousePosition({
className: 'custom-mouse-position', // show mouse position
target: document.getElementById('mouse-position'),
undefinedHTML: 'Mouse Coords : ',
});



////////////////////////////////// MAP STARTUP /////////////////////////////////////////////


var map_view = new ol.View({
  center : [343434, 5744750], // [clermont]
  zoom : 16,
  // center: ol.proj.fromLonLat([3.0913,45.78063]), // [place delille]
  // zoom: 16,

});


var map = new ol.Map({
controls: ol.control.defaults().extend([mousePositionControl]), // add mouse position
target: 'map',

layers : [raster,wfs_lines,wfs_huge_test],

interactions: [
          interactionSelectPointerMove,
          new ol.interaction.MouseWheelZoom(),
          new ol.interaction.DragPan()
      ],
view : map_view,

});


////////////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////////////////////////

//////////////////////////////     WFS-T TRANSACTION   //////////////////////////////////

// define 
var formatWFS = new ol.format.WFS();


var formatGML = new ol.format.GML3({
  featureNS : 'activmap',
  //featureNS: 'AM_workspace',
  featureType: 'huge_test',
  srsName: 'EPSG:3857',
  version: '2.0.0',
});

var dirty = {};



var transactWFS = function (mode, f) {
  console.log("mode: ",mode);
  console.log('f:',f);
  console.log("start transaction transaction!");
  switch (mode) {
    case 'insert':
        node = formatWFS.writeTransaction([f], null, null, formatGML);
        break;
    case 'update':
        node = formatWFS.writeTransaction(null, [f], null, formatGML);
        break;
    case 'delete':
        node = formatWFS.writeTransaction(null, null, [f], formatGML);
        break;
  }
  var xs = new XMLSerializer();
  var payload = xs.serializeToString(node);
  console.log('payload',payload);
  var geo = f.getGeometry();
  var geometry = geo.getCoordinates();

  console.log("posting...");
  $.ajax({
      type: 'POST',
      url:'http://serveur-carto:8080/geoserver/ows/',
      //url:'http://localhost:8080/geoserver/ows',
      dataType: 'xml',
      processData: false,
      contentType: 'text/xml',
      data: payload,
      success: function(response){
        console.log("request posted to server");
      console.log('response : ',response);
      },
      error: function(e) {
        console.log('error!')
        console.log(e);
      }
  }).done();

};


// ADD point on click
document.getElementById('add_point').addEventListener("click", function (){
console.log("click!");
  map.removeInteraction(interaction);
  
  interactionSelect.getFeatures().clear();
  map.removeInteraction(interactionSelect);
  interaction = new ol.interaction.Draw({
      type: 'Point',
      source: wfs_src_huge_test,         /////// LAYER IN WHICH TO INSERT POINTS
      geometryName:'geom'
  });
  map.addInteraction(interaction);
  interaction.on('drawend', function (e) {
    var feature = e.feature;
    console.log(e.feature);
    feature.set('geom', feature.getGeometry());
    transactWFS('insert', e.feature);
    console.log('insert');
  });
  map.addInteraction(interaction);
});


// DELETE on click
document.getElementById('delete').addEventListener("click", function (){
console.log("delete!");
map.removeInteraction(interaction);
interactionSelect.getFeatures().clear();
map.removeInteraction(interactionSelect);


interaction = new ol.interaction.Select(); // select the clicked point
interaction.getFeatures().on('add', function (e) {
    transactWFS('delete', e.target.item(0));
    interactionSelectPointerMove.getFeatures().clear();
    interaction.getFeatures().clear();
});
map.addInteraction(interaction);

});

document.getElementById('clear').addEventListener("click",function(){
map.removeInteraction(interaction);
interactionSelect.getFeatures().clear();
map.removeInteraction(interactionSelect);

console.log("cleared!");
});



/// copy/paste


/*
$('button').click(function () {
console.log('start click');
$(this).siblings().removeClass('btn-active');
$(this).addClass('btn-active');
map.removeInteraction(interaction);
interactionSelect.getFeatures().clear();
map.removeInteraction(interactionSelect);

switch ($(this).attr('id')) {

    case 'btnEdit': /// modify point
        map.addInteraction(interactionSelect);
        interaction = new ol.interaction.Modify({
            features: interactionSelect.getFeatures()
        });
        map.addInteraction(interaction);
        map.addInteraction(interactionSnap);
        dirty = {};
        interactionSelect.getFeatures().on('add', function (e) {
            e.element.on('change', function (e) {
                dirty[e.target.getId()] = true;
            });
        });
        interactionSelect.getFeatures().on('remove', function (e) {
            var f = e.element;
            if (dirty[f.getId()]) {
                delete dirty[f.getId()];
                var featureProperties = f.getProperties();
                delete featureProperties.boundedBy;
                var clone = new ol.Feature(featureProperties);
                clone.setId(f.getId());
                transactWFS('update', clone);
            }
        });
        break;

    case 'add_point': /// add point 
        interaction = new ol.interaction.Draw({
            type: 'Point',
            source: vector.getSource(),
            geometryName:'geom'
        });
        map.addInteraction(interaction);
        interaction.on('drawend', function (e) {
          var feature = e.feature;
          feature.set('geom', feature.getGeometry());
            transactWFS('insert', e.feature);
        });
        break;

    case 'add_line': /// add line
        interaction = new ol.interaction.Draw({
            type: 'LineString',
            source: vector.getSource(),
                geometryName:'geom'
        });
        map.addInteraction(interaction);
        interaction.on('drawend', function (e) {
          var feature = e.feature;
          feature.set('geom', feature.getGeometry());
            transactWFS('insert', e.feature);
        });
        break;

    case 'add_polygon': // add polygon
        interaction = new ol.interaction.Draw({
            type: 'MultiPolygon',
            source: vector.getSource(),
            geometryName:'geom'
        });
        interaction.on('drawend', function (e) {

          var feature = e.feature;
          feature.set('geom', feature.getGeometry());
            transactWFS('insert', e.feature);
            });

        map.addInteraction(interaction);
        break;

    case 'btnDelete': /// delete point
        interaction = new ol.interaction.Select();
        interaction.getFeatures().on('add', function (e) {
            transactWFS('delete', e.target.item(0));
            interactionSelectPointerMove.getFeatures().clear();
            interaction.getFeatures().clear();
        });
        map.addInteraction(interaction);
      break;

    default:
      console.log("default!");
      break;

}


});


*/





//////////////////  toggle function [ to be improved ]   ///////////////////////// 
toggle_points = 0;
toggle_lines = 1;
toggle_polygons = 0;


document.getElementById('points').addEventListener("click", function (){
  if (toggle_points == 1){
  map.removeLayer(wfs_points);
  toggle_points = 0;
}else{
  map.addLayer(wfs_points);
  toggle_points = 1;
}
});

document.getElementById('lines').addEventListener("click",function(){
if (toggle_lines == 1){
  map.removeLayer(wfs_lines);
  toggle_lines = 0;
}else{
  map.addLayer(wfs_lines);
  toggle_lines = 1;
}
});

document.getElementById('polygons').addEventListener("click",function(){
if (toggle_polygons == 1){
  map.removeLayer(wfs_polygons);
  toggle_polygons = 0;
}else{
  map.addLayer(wfs_polygons);
  toggle_polygons = 1;
}
});

///////////////////// display features on click ////////////////////////

/*
// display feature info on click. [ WMS ]
map.on('singleclick', function (evt) {
document.getElementById('info').innerHTML = '';
var viewResolution = map_view.getResolution();
var url = imgsrc_points.getFeatureInfoUrl( // select WMS layer source to fetch info
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





