varying vec3 pos;
varying vec3 staticPos;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  pos = gl_Position.xyz;
  staticPos = position + vec3(0.5);
}