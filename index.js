
var viewer = new Marzipano.Viewer(document.getElementById('pano'));
var scene = {};

sceneData.scenes.forEach(function(s) {
  var source = Marzipano.ImageUrlSource.fromString("tiles/" + s.id + "/{z}/{f}/{y}/{x}.jpg");
  var geometry = new Marzipano.CubeGeometry(s.levels);
  var limiter = Marzipano.RectilinearView.limit.traditional(s.faceSize, 100*Math.PI/180);
  var view = new Marzipano.RectilinearView(s.initialViewParameters, limiter);
  scene[s.id] = viewer.createScene({ source: source, geometry: geometry, view: view });
});

function switchSceneById(id) {
  if (scene[id]) {
    scene[id].switchTo();
  } else {
    console.error("Scene not found: " + id);
  }
}

var hash = window.location.hash.substring(1);
switchSceneById(hash || "L");
