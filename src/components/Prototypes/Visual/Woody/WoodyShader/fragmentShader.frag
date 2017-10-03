varying vec2 vUv;
uniform sampler2D wood;

void main() {

  // vec4 rainbow = vec4(1.0);

  // vec4 outputColor = vec4(
  // 	rainbow.x + 0.6,
  // 	(rainbow.y * rainbow.x) + 0.6,
  // 	rainbow.y + 0.6,
  // 	0.2
  // );

  vec4 woodColor = texture2D( wood, vUv );
  gl_FragColor = woodColor;

  // gl_FragColor = vec4( vec3(0.0,0.0,1.0) , 0.5);
}
