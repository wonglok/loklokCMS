varying vec2 vUv;
varying float vfinalSize;
// varying vec3 vNormal;
uniform sampler2D wood;

uniform vec2 mousePos;
uniform vec2 resolution;
uniform float opacity;

uniform sampler2D ball;

void main() {

  // vec4 woodColor = texture2D( wood, vUv );
  // gl_FragColor = vec4(vec3(woodColor) * 0.5, 0.223 * opacity);

  vec4 ballColor = texture2D( ball, gl_PointCoord );
  if (ballColor.r < 0.01) {
    discard;
  } else {
    ballColor.a = 0.04;
    ballColor.r *= 1.4;

    ballColor = mix(vec4(1.0,1.0,1.0, 0.04), ballColor, mousePos.x);

    gl_FragColor = ballColor;
  }

  // float finalSize = vfinalSize * 2.0;

  // vec2 pos = mod(gl_PointCoord.xy, vec2(finalSize)) - vec2(finalSize / 2.0);
  // float dist_squared = dot(pos, pos);
  // gl_FragColor = (dist_squared < finalSize * finalSize)
  //         ? vec4(.90, .90, .90, 0.03)
  //         : vec4(.20, .20, .40, 0.03);

  // gl_FragColor = vec4(vec3(1.0), 0.03);

  // gl_PointCoord.xy
}
