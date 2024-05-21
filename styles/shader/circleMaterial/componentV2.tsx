import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { Box3, MeshBasicMaterial, MeshDepthMaterial, MeshLambertMaterial, MeshStandardMaterial } from 'three'
import CustomShaderMaterial from 'three-custom-shader-material'

import circleFrag from './glsl/circle.frag'
import circleVert from './glsl/circle.vert'

const shader = {
  vertex: `
    uniform float uTime;
    uniform vec3 uMin;
    uniform vec3 uMax;
    uniform float uRad;
    uniform float uAspect;
    varying vec4 vFrag;
    varying float csm_vVisibility;
    
    // Mapping function
    // https://github.com/msfeldstein/glsl-map/blob/master/index.glsl
    float mapRange(float value, float inMin, float inMax, float outMin, float outMax) {
      return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
    }
    
    vec3 edges(vec3 v, vec3 d, float offset) {
      if(d.x >= 0.0){
        v.z = v.z + ((offset / uAspect) * (d.x));
      }
      return v;
    }

      void main() {
        float x = mapRange(position.x ,  uMin.x, uMax.x,  -PI, PI );
        vec3 dir = vec3(sin(x), cos(x), 0);
        vec3 pos = uRad*dir + vec3(0., 0., position.z) + dir * position.y;
        vFrag =   modelViewMatrix * vec4( pos, 1.0 );
        vec3 detection = vec3((-((-vFrag.x - 0.85)) * (vFrag.x - 0.85 )) , 0. , (vFrag.z + 11.2));
        csm_vVisibility = detection.z ;
        pos = edges(pos, detection, 0.05);
        csm_Position = vec3(1.5 * pos);
      } 
    `,
  fragment: `
      varying float csm_vVisibility;

      void main() {
        csm_FragColor = vec4(csm_FragColor.xyz, csm_vVisibility);
      }
    `,
}

type Props = {
  rad: number
}

function CircleMaterial({...props}: Props) {
  const materialRef = useRef<any | null>(null)
  const boundingBoxRef = useRef<Box3>(new Box3)   

  const firstUpdate = () => {
    const self = materialRef.current
    try {
      self.__r3f.parent.geometry.computeBoundingBox();
      self.__r3f.parent.geometry.center();

    } catch (error) {
      console.warn('A Circle material failed to compute bounding box.')
    }finally {
      const newBox = self?.__r3f.parent.geometry.boundingBox || null;
      self.__r3f.parent.geometry.rotateX(-1 * Math.PI/2)
      boundingBoxRef.current = newBox;
      if(materialRef.current){
        console.log('updated')
        materialRef.current.uniforms.uMin.value = boundingBoxRef.current.min;
        materialRef.current.uniforms.uMax.value = boundingBoxRef.current.max;
      }
    }
  };

  useEffect(()=>{
    firstUpdate()
  },[])

  useFrame((state, d)=>{
    if(materialRef?.current){
      materialRef.current.uniforms.uAspect.value = state.viewport.aspect
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })



  const uniforms = useMemo(
    () => ({
      uMin: {
        value: [0,0,0]
      },
      uMax: {
        value: [0,0,0]
      },
      uRad: {
        value: props.rad
      },
      uTime: {
        value: 0
      },
      uAspect: {
        value: 0
      }
    })
  ,[props.rad])

  return (
      <CustomShaderMaterial
        ref={materialRef}
        baseMaterial={MeshStandardMaterial}
        silent
        vertexShader={shader.vertex}
        fragmentShader={shader.fragment}
        uniforms={uniforms}
        transparent
        color={'#f5f178'}
      />
  )
}

export default CircleMaterial