#include <common>

uniform vec2 mousePos;

float constrain(float val, float min, float max) {
    if (val < min) {
        return min;
    } else if (val > max) {
        return max;
    } else {
        return val;
    }
}

vec2 getDiff (in vec2 lastPos, in vec2 mousePos) {
  vec2 diff = lastPos.xy / 33.3 - mousePos;
  float distance = constrain(length(diff), 18.0, 50.0);
  float strength = 0.35 / (distance * distance);

  diff = normalize(diff);
  // delta
  diff = diff * strength * -1.0;
  // diff = diff * strength * (-20.83) * (1.0 / delta) * 0.0183;

  return diff;
}

void main()	{
  vec2 cellSize = 1.0 / resolution.xy;
  vec2 uv = gl_FragCoord.xy * cellSize;

  vec4 lastPos = texture2D( positionInfo, uv );
  vec4 lastVel = texture2D( velocityInfo, uv );

  vec2 diff = getDiff( lastPos.xy, mousePos );

  lastVel.xy += diff;

  gl_FragColor = lastVel;
}
