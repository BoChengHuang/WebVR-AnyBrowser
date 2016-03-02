var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRation);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
	75, window.innerWidth / window.innerHeight, 0.3, 10000);

var control = new THREE.VRControls(camera);
var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);

var light = new THREE.PointLight(0xffffff, 1.0, 15);
light.position.set(0,0,0);
scene.add(light);

var bitGeometry = new THREE.DodecahedronGeometry(0.5);
var bitMaterial = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  shading: THREE.FlatShading
});
var bit = new THREE.Mesh(bitGeometry, bitMaterial);
bit.position.z = -2;
scene.add(bit);

var planeGeometry =
  new THREE.PlaneBufferGeometry(1000, 1000, 1000);
var planeMaterial = new THREE.MeshPhongMaterial({
  color: 0x0000ff,
  shading: THREE.DoubleSide
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.y = -2;
plane.rotation.x = -Math.PI/2;
scene.add(plane);

var vrMode = false;

function enterVR () {
    effect.setFullScreen(true);
    vrMode = true;
}

function exitVR () {
    effect.setFullScreen(false);
    vrMode = false;
}

function toggleVR() {
  if (!vrMode) {
    enterVR();
  } else {
    exitVR();
  }
}

function animate (time) {
    // bit.position.x = Math.sin(time/1000) * 2;
    // bit.position.y = Math.sin(time/2000);
    // bit.rotation.x += 0.01;
    // bit.rotation.y += 0.01;
    
    control.update();
    effect.render(scene, camera);
    
    requestAnimationFrame(animate);
}

animate();

function onKey(event) {
  if (event.keyCode == 70) { // f
    toggleVR();
  }
};
window.addEventListener('keydown', onKey, true);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  effect.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize, false);