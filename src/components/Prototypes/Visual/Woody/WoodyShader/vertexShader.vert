// varying vec2 vUv;
// varying float vfinalSize;
// varying vec3 vNormal;

uniform sampler2D wood;
uniform float pointSize;
uniform vec2 mousePos;
uniform float time;

attribute float vertIndex;

#define M_PI 3.1415926535897932384626433832795

#include <common>

//  Classic Perlin 3D Noise
//  by Stefan Gustavson
//
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 *
      vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

float atan2(in float y, in float x) {
	bool xgty = (abs(x) > abs(y));
	return mix(M_PI/2.0 - atan(x,y), atan(y,x), float(xgty));
}

vec3 fromBall(float r, float az, float el) {
	return vec3(
    r * cos(el) * cos(az),
    r * cos(el) * sin(az),
    r * sin(el)
  );
}

void toBall(vec3 pos, out float az, out float el) {
	az = atan2(pos.y, pos.x);
	el = atan2(pos.z, sqrt(pos.x * pos.x + pos.y * pos.y));
}

float evaluateBezierPosition(float v1, float v2, float v3, float v4, float t ) {
    vec3 p;
    float OneMinusT = 1.0 - t;
    float b0 = OneMinusT*OneMinusT*OneMinusT;
    float b1 = 3.0*t*OneMinusT*OneMinusT;
    float b2 = 3.0*t*t*OneMinusT;
    float b3 = t*t*t;
    return b0*v1 + b1*v2 + b2*v3 + b3*v4;
}

void main() {
  // vUv = uv;

  vec2 dynamicUV = uv;
  dynamicUV = dynamicUV * 0.5;
  dynamicUV += abs(-sin(time) * cos(time));
  dynamicUV = dynamicUV * 0.5 + cnoise(uv * 0.25) * 0.05;
  // dynamicUV.x = dynamicUV.x * 0.75 + (sin(time * 3.0) * cos(time * 3.0) + 0.5) * 0.25;

  // dynamicUV *= abs(mousePos.x);

  vec4 woodColor = texture2D(wood, dynamicUV);

  float az = 0.0;
  float el = 0.0;

  // vec3 noiser = position + woodColor.z * normal.z * 20.0;

  vec3 noiser = woodColor.z * normal.z * 20.0
    + (vec3(woodColor) * 2.0 - 1.0) * 30.0;

  toBall(mix(position + noiser, position + noiser * 0.75, mousePos.x), az, el);

  vec3 levitation = vec3(woodColor) * normal * 8.0;
  // vNormal = levitation;

  vec3 newPos = fromBall(70.0, az, el) + levitation;
  // vec3 newPos = position + normal * vec3(woodColor) * 20.0;
  // vec3 newPos = position;

  vec4 finalDot = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  float finalSize = woodColor.z * 5.0;

  float slider = clamp(mousePos.x, 0.0, 1.0);

  float sizeInc = slider * 80.0;
  float bezR = 1.0 - evaluateBezierPosition(1.0, 0.0, 1.0, 0.0, (slider));
  float bez = evaluateBezierPosition(0.0, 1.0, 0.0, 1.0, (slider));
  finalSize += sizeInc * bezR;

  // float bez = evaluateBezierPosition(0.0, 1.0, 0.0, 1.0, (slider + 0.15));
  highp float rand1 = abs(rand(vec2(vertIndex * 0.000001)));
  highp float reducer = abs(slider) * bez * 200.0;
  if ((rand1 * rand1 * rand1 * rand1 * rand1 * rand1 * rand1 * rand1 * rand1 * rand1 * rand1 * 200.0) < reducer)   {
    finalDot.w = 0.0;
  }

  // vfinalSize = finalSize;
  gl_PointSize = abs(finalSize);
  gl_Position = finalDot;
}