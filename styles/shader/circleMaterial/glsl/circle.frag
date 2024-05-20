uniform float uTime;
uniform vec3 uMin;
uniform vec3 uMax;
varying vec2 vUv;
varying float vDebug;
varying vec3 vPosition;

void main() {
    vec3 col = vec3(0.9921, 0.9686, 0.3686);
    gl_FragColor = vec4( col, vPosition.y >=  0.01 &&  vPosition.y <= 0.11? 1.: 0. );
    gl_FragColor = vec4(vDebug, 0., 0., 1. );
}