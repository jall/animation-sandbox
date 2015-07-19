/* global define, require, THREE */
define(['three'], function moduleDefinition() {
  "use strict";

  var canvas, renderer, scene, camera;
  var onRender = [];

  init();
  populateScene();
  animate();
  return publicApi();

  function init() {
    canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      clearColor: 0x000000
    });
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, w / h, 0.01, 1000);

    window.addEventListener('resize', function windowResizeCallback() {
      renderer.setSize( window.innerWidth, window.innerHeight );
      camera.aspect	= window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }, false);
  }

  function populateScene() {
    require(['text!fragment/opaque-colors.glsl', 'text!vertex/basic.glsl'], function cubeSetup(fragmentShader, vertexShader) {
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

      onRender.push(function updateCubeRotation() {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      });

      onRender.push(function updateCubeMaterialTime(deltaTime, nowTime, startTime) {
        shaderMaterial.uniforms.time.value = nowTime - startTime;
      });
    });
  }

  function animate() {
    // Physics will run at different speeds on different browsers (e.g. mobile and
    // desktop) when using requestAnimationFrame, so things will change between
    // systems. The workaround is either to use setInterval for your physics
    // engine, or calculate the time elapsed since the last frame and factor this
    // into your equations, e.g. distance a mesh has travelled.
    var startTime, lastTime;
    startTime = lastTime = Date.now();

    render();

    function render() {
      requestAnimationFrame(render);

      var timeNow = Date.now();
      var dt = timeNow - lastTime;
      lastTime = timeNow;

      onRender.forEach(function executeRenderCallback(callback) {
        callback(dt / 1000, timeNow / 1000, startTime / 1000);
      });

      renderer.render(scene, camera);
    }
  }

  function publicApi() {
    return {
      renderer: renderer,
      onRender: onRender,
      scene: scene,
      camera: camera
    };
  }
});