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

// add a cube
var geometry = new THREE.CubeGeometry(50,50,50);
var material = new THREE.MeshLambertMaterial({color: 0xc5c5ff, shading: THREE.FlatShading});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
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

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.02;

  renderer.render(scene, camera);
};

render();