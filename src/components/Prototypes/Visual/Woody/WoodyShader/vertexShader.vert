varying vec2 vUv;

uniform sampler2D wood;
uniform float pointSize;
uniform vec2 mousePos;

#define M_PI 3.1415926535897932384626433832795

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

void main() {
  vec4 woodColor = texture2D( wood, uv + mousePos * 0.015 );
  vUv = uv;

  float az = 0.0;
  float el = 0.0;

  vec3 noiser = position + (vec3(woodColor) * 2.0 - 1.0) * 50.0;

  toBall(noiser, az, el);

  vec3 newPos = fromBall(70.0, az, el);

  // vec3 newPos = position + normal * vec3(woodColor) * 20.0;
  // vec3 newPos = position;


  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  gl_PointSize = pointSize;
}