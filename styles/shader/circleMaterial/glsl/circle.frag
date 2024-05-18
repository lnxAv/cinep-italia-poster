#define PI 3.141593

uniform float rad;
uniform vec3 uMin;
uniform vec3 uMax;

float mapCircleRange(float val, float min1, float max1, float min2, float max2) {
    return clamp(min2 + (val - min1) * (max2-min2)/(max1 - min1), min2, max2);
}

void main () {
    vec3 p = position;
    float theta = mapCircleRange(position.x, uMin.x, uMax.x, -PI, PI);
    vec3 circle = vec3(sin(theta), cos(theta), 0.);
    p = circle*rad + circle*p.y + vec3(0., 0., p.z);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( p, 1.0 );
}