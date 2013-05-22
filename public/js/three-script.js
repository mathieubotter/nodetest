
if (!Detector.WebGL) Detector.addGetWebGLMessage();

var scene, camera, renderer;
var cube, cube2, plane, spotlight, hemiLight, directionalLight;
var controls;
var stats;

// Spotlight move
var reversed = false;

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
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMapEnabled = true;
  $surface.append(renderer.domElement);

  // scene
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog( 0xffffff, 1, 5000 );
  scene.fog.color.setHSL( 0.6, 0, 1 );

  // and a camera
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  // camera.position.x = 100;
  camera.position.y = 400;
  camera.position.z = 1000;
  // camera.rotation.x = -0.1;
  // camera.rotation.y = 0.2;
  scene.add(camera);

  // The Plane
  plane = new THREE.Mesh(new THREE.PlaneGeometry(5000, 5000, 50, 50), 
    new THREE.MeshLambertMaterial());
  plane.position.y = -100;
  plane.rotation.x = -1.6;
  plane.receiveShadow = true;
  scene.add(plane);

  // The Cube
  var geometry = new THREE.CubeGeometry(100,100,100);
  var material = new THREE.MeshPhongMaterial({color: 0x75d1c8, shading: THREE.FlatShading});
  cube = new THREE.Mesh(geometry, material);
  cube.position.x = -150;
  cube.castShadow = true;
  scene.add(cube);

  // The Cube2
  var material2 = new THREE.MeshLambertMaterial({color: 0xcfbe6e, shading: THREE.FlatShading});
  cube2 = new THREE.Mesh(geometry, material2);
  cube2.position.x = 150;
  cube2.castShadow = true;
  scene.add(cube2);

  // Lights
  // spotlight #1 -- yellow, dark shadow
  spotlight = new THREE.SpotLight(0xb0b0e5);
  spotlight.position.set(0,600,-200);
  spotlight.shadowCameraVisible = true;
  spotlight.shadowDarkness = 0.6;
  spotlight.intensity = 1;
  // must enable shadow casting ability for the light
  spotlight.castShadow = true;
  scene.add(spotlight);

  hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
  hemiLight.color.setHSL( 0.6, 1, 0.6 );
  hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
  hemiLight.position.set( 0, 500, 0 );
  // hemiLight.castShadow = true;
  scene.add( hemiLight );

  // Ambient light
  // var ambientLight = new THREE.AmbientLight(0x222222);
  // ambientLight.position.set( 0, 200, 100 );
  // scene.add(ambientLight);

  // directional lighting
  directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(100, 100, 300);
  scene.add(directionalLight);

  // create "light-ball" meshes
  var sphereGeometry = new THREE.SphereGeometry( 10, 16, 8 );
  var darkMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );

  var wireframeMaterial = new THREE.MeshBasicMaterial( 
    { color: 0xffff00, wireframe: true, transparent: true } ); 
  var shape = THREE.SceneUtils.createMultiMaterialObject( 
    sphereGeometry, [ darkMaterial, wireframeMaterial ] );
  shape.position = hemiLight.position;
  scene.add( shape );
  
  var wireframeMaterial = new THREE.MeshBasicMaterial( 
    { color: 0x0000ff, wireframe: true, transparent: true } ); 
  var shape = THREE.SceneUtils.createMultiMaterialObject( 
    sphereGeometry, [ darkMaterial, wireframeMaterial ] );
  shape.position = directionalLight.position;
  scene.add( shape );

  var wireframeMaterial = new THREE.MeshBasicMaterial( 
    { color: 0x5c683f, wireframe: true, transparent: true } ); 
  var shape = THREE.SceneUtils.createMultiMaterialObject( 
    sphereGeometry, [ darkMaterial, wireframeMaterial ] );
  shape.position = spotlight.position;
  scene.add( shape );

  // Point light
  // var pointLight = new THREE.PointLight(0xFFFFFF);
  // pointLight.position.x = 10;
  // pointLight.position.y = 50;
  // pointLight.position.z = 130;
  // scene.add(pointLight);

  // Skybox/Fog
  // var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
  // var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0xcccccc, side: THREE.BackSide } );
  // var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
  // scene.add(skyBox);
  // scene.fog = new THREE.FogExp2( 0xcccccc, 0.00025 );

  // Skydome
  var vertexShader = document.getElementById( 'vertexShader' ).textContent;
  var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
  var uniforms = {
    topColor:    { type: "c", value: new THREE.Color( 0x0077ff ) },
    bottomColor: { type: "c", value: new THREE.Color( 0xffffff ) },
    offset:    { type: "f", value: 33 },
    exponent:  { type: "f", value: 0.6 }
  }
  uniforms.topColor.value.copy( hemiLight.color );

  scene.fog.color.copy( uniforms.bottomColor.value );

  var skyGeo = new THREE.SphereGeometry( 5000, 32, 15 );
  var skyMat = new THREE.ShaderMaterial( { vertexShader: vertexShader, fragmentShader: fragmentShader, uniforms: uniforms, side: THREE.BackSide } );

  var sky = new THREE.Mesh( skyGeo, skyMat );
  scene.add( sky );

  // Controls
  controls = new THREE.TrackballControls(camera);
  controls.rotateSpeed = 1.2;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;

  controls.noZoom = false;
  controls.noPan = false;

  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;

  controls.keys = [ 65, 83, 68 ];

  // Axes
  var axes = new THREE.AxisHelper(50);
  scene.add(axes);

  // Stats
  stats = new Stats();
  $surface.append(stats.domElement);

  document.addEventListener( 'keydown', onKeyDown, false );
}

function onKeyDown ( event ) {

  switch ( event.keyCode ) {

    case 72: /*h*/
    hemiLight.visible = !hemiLight.visible;
    break;

    case 68: /*d*/
    directionalLight.visible = !directionalLight.visible;
    break;
  }
}

// Animate
function animate() {

  requestAnimationFrame(animate);

  render();
  stats.update();
}

// Render
function render() {

  var timer = new Date().getTime() * 0.0005;

  if (spotlight.position.x <= -200 && reversed == false) {
    reversed = true;
  }
  else if (spotlight.position.x >= 200 && reversed == true) {
    reversed = false;
  }
  if (reversed) {
    spotlight.position.x += 2;
  }
  else {
    spotlight.position.x -= 2;
  }

  cube.rotation.x += 0.005;
  cube.rotation.y += 0.008;

  cube2.rotation.y += 0.02;

  // camera.lookAt(scene.position);
  // camera.position.x = Math.floor(Math.cos(timer) * 500);
  // camera.position.z = Math.floor(Math.sin(timer) * 500);

  controls.update();

  renderer.render(scene, camera);
}