#include <common>

uniform vec2 mousePos;

void main()	{
  vec2 cellSize = 1.0 / resolution.xy;
  vec2 uv = gl_FragCoord.xy * cellSize;

  vec4 lastVelocity = texture2D( velocityInfo, uv );
  vec4 lastPos = texture2D( positionInfo, uv );

  lastPos.xyz += lastVelocity.xyz;

  gl_FragColor = lastPos;
}
