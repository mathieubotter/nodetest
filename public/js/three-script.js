// get the DOM element to attach to
// - assume we've got jQuery to hand
var $surface = $('#surface');

// set the scene size
var WIDTH = 400,
    HEIGHT = 300;

// set some camera attributes
var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera(  VIEW_ANGLE,
                                ASPECT,
                                NEAR,
                                FAR  );
var scene = new THREE.Scene();

// the camera starts at 0,0,0 so pull it back
camera.position.z = 200;

// start the renderer
renderer.setSize(WIDTH, HEIGHT);

// attach the render-supplied DOM element
$surface.append(renderer.domElement);

// create the sphere's material
var sphereMaterial = new THREE.MeshLambertMaterial(
{
    color: 0xCC0000
});

// set up the sphere vars
var radius = 50, segments = 16, rings = 16;

// create a new mesh with sphere geometry -
// we will cover the sphereMaterial next!
var sphere = new THREE.Mesh(
   new THREE.SphereGeometry(radius, segments, rings),
   sphereMaterial);

// add the sphere to the scene
//scene.add(sphere);

// add a cube
var geometry = new THREE.CubeGeometry(50,50,50);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// and the camera
scene.add(camera);

// create a point light
var pointLight = new THREE.PointLight( 0xFFFFFF );

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);

// draw!
var render = function () {
  requestAnimationFrame(render);

  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.02;

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.02;

  renderer.render(scene, camera);
};

render();