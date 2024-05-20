#define PI 3.141593

uniform float uTime;
uniform vec3 uMin;
uniform vec3 uMax;
uniform float uRad;
uniform float uZRotate;
uniform float uAspect;
varying vec2 vUv;
varying vec3 vPosition;
varying float vDebug;
varying vec4 vFrag;

// Mapping function
// https://github.com/msfeldstein/glsl-map/blob/master/index.glsl
float map(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

vec3 edges(vec3 v, vec2 d, float offset) {
  if(d.x >= 0.0){
    v.z = v.z + ((offset / uAspect) * (d.x));
  }
  return v;
}

void main () {
    vUv = uv;
    vPosition = position;
    float x = map(position.x ,  uMin.x, uMax.x,  -PI, PI );
    vec3 dir = vec3(sin(x), cos(x), 0);
    vec3 pos = uRad*dir + vec3(0., 0., position.z) + dir * position.y;
    vFrag = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
    vec2 detection = vec2((-((-vFrag.x - 0.9)) * (vFrag.x - 0.9 )) , -(vFrag.z - 6.5));
    vDebug = detection.y;
    pos = edges(pos, detection, 0.05);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}