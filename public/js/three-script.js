var $surface = $('#surface');

// set the scene size
var WIDTH = 800,
    HEIGHT = 400;

// set some camera attributes
var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 10,
    FAR = 1000;

// Create a WebGL renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
$surface.append(renderer.domElement);

// scene
var scene = new THREE.Scene();

// and a camera
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
camera.position.z = 400;
scene.add(camera);
// var camera = new THREE.OrthographicCamera( WIDTH / - 2, WIDTH / 2, HEIGHT / 2, HEIGHT / - 2, 1, 1000 );
// camera.position.z = 400;
// scene.add(camera);

// The Cube
var geometry = new THREE.CubeGeometry(100,100,100);
var material = new THREE.MeshLambertMaterial({color: 0x75d1c8, shading: THREE.FlatShading});
var cube = new THREE.Mesh(geometry, material);
cube.position.x = -100;
scene.add(cube);

// The Cube2
var material2 = new THREE.MeshLambertMaterial({color: 0xcfbe6e, shading: THREE.FlatShading});
var cube2 = new THREE.Mesh(geometry, material2);
cube2.position.x = 100;
scene.add(cube2);

// Ambient light
var ambientLight = new THREE.AmbientLight(0x202020);
scene.add(ambientLight);

// Point light
var pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;
scene.add(pointLight);

// Render
var render = function () {
  requestAnimationFrame(render);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.02;

  cube2.rotation.y += 0.02;

  renderer.render(scene, camera);
};

render();