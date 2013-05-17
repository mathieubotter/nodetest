
var scene, camera, renderer;
var cube, cube2, plane;
var controls;

init();
animate();

function init() {

  var $surface = $('#surface');

  // set the scene size
  var WIDTH = 940,
      HEIGHT = 500;

  // set some camera attributes
  var VIEW_ANGLE = 50,
      ASPECT = WIDTH / HEIGHT,
      NEAR = 1,
      FAR = 10000;

  // Create a WebGL renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(WIDTH, HEIGHT);
  $surface.append(renderer.domElement);

  // scene
  scene = new THREE.Scene();

  // and a camera
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  // camera.position.x = 100;
  camera.position.y = 100;
  camera.position.z = 500;
  // camera.rotation.x = -0.1;
  // camera.rotation.y = 0.2;
  scene.add(camera);

  // The Plane
  plane = new THREE.Mesh(new THREE.PlaneGeometry(500, 500, 10, 10), 
    new THREE.MeshLambertMaterial({wireframe: true}));
  plane.position.y = -100;
  plane.rotation.x = -1.6;
  scene.add(plane);

  // The Cube
  var geometry = new THREE.CubeGeometry(100,100,100);
  var material = new THREE.MeshPhongMaterial({color: 0x75d1c8, shading: THREE.FlatShading});
  cube = new THREE.Mesh(geometry, material);
  cube.position.x = -150;
  scene.add(cube);

  // The Cube2
  var material2 = new THREE.MeshLambertMaterial({color: 0xcfbe6e, shading: THREE.FlatShading});
  cube2 = new THREE.Mesh(geometry, material2);
  cube2.position.x = 150;
  scene.add(cube2);

  // Ambient light
  var ambientLight = new THREE.AmbientLight(0x222222);
  scene.add(ambientLight);

  // directional lighting
  var directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);

  // Point light
  var pointLight = new THREE.PointLight(0xFFFFFF);
  pointLight.position.x = 10;
  pointLight.position.y = 50;
  pointLight.position.z = 130;
  // scene.add(pointLight);

  // Controls
  controls = new THREE.TrackballControls(camera);
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;

  controls.noZoom = false;
  controls.noPan = false;

  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;

  controls.keys = [ 65, 83, 68 ];
}

// Animate
function animate() {

  requestAnimationFrame(animate);
  render();
}

// Render
function render() {

  var timer = new Date().getTime() * 0.0005;

  cube.rotation.x += 0.005;
  cube.rotation.y += 0.008;

  cube2.rotation.y += 0.02;

  // camera.lookAt(scene.position);
  // camera.position.x = Math.floor(Math.cos(timer) * 500);
  // camera.position.z = Math.floor(Math.sin(timer) * 500);

  controls.update();

  renderer.render(scene, camera);
};