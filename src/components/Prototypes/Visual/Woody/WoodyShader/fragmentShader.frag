varying vec2 vUv;
varying vec3 vNormal;
uniform sampler2D wood;

uniform vec2 resolution;

void main() {

  vec4 woodColor = texture2D( wood, vUv );
  gl_FragColor = vec4(vec3(woodColor) * 0.5, 1.0);

}
