var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

var controls = new THREE.VRControls(camera);

var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);


var params = {
  hideButton: false,
  isUndistorted: false
};
var manager = new WebVRManager(renderer, effect, params);


// Cube
var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);

cube.position.z = -1;
scene.add(cube);


var lastRender = 0;
function animate (timestamp) {
  var delta = Math.min(timestamp - lastRender, 500);
  lastRender = timestamp;

  cube.rotation.y += delta * 0.0006;

  controls.update();

  manager.render(scene, camera, timestamp);

  requestAnimationFrame(animate);

}

animate(performance ? performance.now() : Date.now());

function onKey(event) {
  if (event.keyCode == 90) { // z
    controls.resetSensor();
  }
}

window.addEventListener('keydown', onKey, true);
