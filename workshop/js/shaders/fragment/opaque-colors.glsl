uniform float time;

varying vec3 pos;
varying vec3 staticPos;

void main() {
  vec3 light = vec3(0.0, 0.0, 2.0);

  light.x = sin(time);
  light.y = cos(time);

  float d = distance(light, pos);

  float i = 0.9 / (d * d);
  i = pow(i, 0.5);

  gl_FragColor = vec4(staticPos * i, 1.0);
}