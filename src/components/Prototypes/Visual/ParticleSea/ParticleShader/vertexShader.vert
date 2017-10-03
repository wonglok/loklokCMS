#include <common>

uniform sampler2D positionInfo;

void main() {
  vec2 cellSize = vec2( 1.0 / WIDTH, 1.0 / WIDTH );
  #include <uv_vertex>

  // vec3 objectNormal = vec3(
  //   ( texture2D( fireworkPosition, uv + vec2( - cellSize.x, 0 ) ).x - texture2D( fireworkPosition, uv + vec2( cellSize.x, 0 ) ).x ) * WIDTH / BOUNDS,
  //   ( texture2D( fireworkPosition, uv + vec2( 0, - cellSize.y ) ).x - texture2D( fireworkPosition, uv + vec2( 0, cellSize.y ) ).x ) * WIDTH / BOUNDS,
  //   1.0 );

  vec3 objectNormal = vec3(1.0);

  vec4 fireworkCoord = texture2D( positionInfo, uv );

  vec3 transformed = vec3( fireworkCoord.x, fireworkCoord.y, fireworkCoord.z );

  gl_PointSize = 2.0;

  vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );
  vec4 outputPos = projectionMatrix * mvPosition;


  gl_Position = outputPos;

}