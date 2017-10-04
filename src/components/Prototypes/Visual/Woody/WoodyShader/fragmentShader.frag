varying vec2 vUv;
uniform sampler2D wood;

uniform vec2 resolution;

void main() {

  // vec4 rainbow = vec4(1.0);

  // vec4 outputColor = vec4(
  // 	rainbow.x + 0.6,
  // 	(rainbow.y * rainbow.x) + 0.6,
  // 	rainbow.y + 0.6,
  // 	0.2
  // );

  vec4 woodColor = texture2D( wood, vUv );
  vec4 finalColor = vec4( vec3(woodColor), 0.25);

  finalColor *= vec4(0.65, 0.65, 0.9, 0.75);

  gl_FragColor = finalColor;

  // gl_FragColor = woodColor;

  // gl_FragColor = vec4( vec3(0.6) , 0.15);
}
