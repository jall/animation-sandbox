requirejs(['text!fragment/opaque-colors.glsl', 'text!vertex/basic.glsl'], function appInitialise(fragmentShader, vertexShader) {
  "use strict";

  var canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var w = canvas.clientWidth;
  var h = canvas.clientHeight;

  var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    clearColor: 0x000000
  });
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(60, w / h, 0.01, 1000);

  var shaderMaterial = new THREE.ShaderMaterial({
    fragmentShader: fragmentShader,
    vertexShader: vertexShader,
    uniforms: {
      time: {
        type: 'f',
        value: 3.0
      }
    }
  });
  var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), shaderMaterial);

  scene.add(cube);

  camera.position.z = 5;

  // Physics will run at different speeds on different browsers (e.g. mobile and
  // desktop) when using requestAnimationFrame, so things will change between
  // systems. The workaround is either to use setInterval for your physics
  // engine, or calculate the time elapsed since the last frame and factor this
  // into your equations, e.g. distance a mesh has travelled.
  var startTime = Date.now();
  var lastTime = Date.now();

  function render() {
    var time = Date.now();
    var dt = time - lastTime;
    lastTime = time;

    shaderMaterial.uniforms.time.value = (time - startTime) / 1000;

    requestAnimationFrame(render);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  render();

});
