/*global require*/
require.config({
  baseUrl: "js/lib",
  paths: {
    "fragment": "../shaders/fragment",
    "vertex": "../shaders/vertex",
    "app": "../app"
  }
});

require(['app/app']);