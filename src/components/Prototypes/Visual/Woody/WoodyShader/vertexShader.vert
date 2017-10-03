varying vec2 vUv;

uniform sampler2D wood;
uniform float pointSize;
uniform vec2 mousePos;

void main() {
  vec4 woodColor = texture2D( wood, uv + mousePos * 0.05 );
  vUv = uv;

  vec3 newPos = position + normal * vec3(woodColor) * 15.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  gl_PointSize = 2.5;
}