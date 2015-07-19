requirejs.config({
  baseUrl: "js/lib",
  paths: {
    "fragment": "../shaders/fragment",
    "vertex": "../shaders/vertex",
    "app": "../app"
  }
});

requirejs(['three', 'app/app']);