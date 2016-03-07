var lmController;
var riggedHandPlugin;

window.controller = lmController = new Leap.Controller({
	background: true,
	optimizeHMD: true
});

lmController.on('deviceStreaming', function () {
	console.log('deviceConnected');
});

lmController.on('connect', function() {
	console.log('leap motion connect');
});

lmController.on('gesture', function(gesture) {
	if (gesture.type == 'swipe') {
		var isVertital = Math.abs(gesture.direction[0] < Math.abs(gesture.direction[1]));
		if (isVertital) {
			if (gesture.direction[0] > 0) {
				console.log('swipe up');
			} else {
				console.log('swipe down');
			}
		}
	}
});

lmController.use('transform', {
	quaternion: (new THREE.Quaternion).setFromEuler(new THREE.Euler(Math.PI * -0.3, 0, Math.PI, 'ZXY')),
	position: new THREE.Vector3(0, 100, 0),
	vr: true,
	effectiveParent: camera
});


lmController.loop(function (frame) {
	if (scene != null) {
		lmController.use('riggedHand', {
			parent: scene,
			camera: camera,
			positionScale: 2,
			renderFn: null,
				boneColors: function (boneMesh, leapHand) {
					return {
						hue: 0.6,
						saturation: 0.2,
						lightness: 0.8
					}
				}
			});
		}
});
