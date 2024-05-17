import { shaderMaterial } from '@react-three/drei';
import { extend, ReactThreeFiber, ThreeElements, useFrame } from '@react-three/fiber';
import React, { memo, useEffect, useRef } from 'react';
import { DoubleSide, MathUtils, NormalBlending, ShaderMaterial } from 'three';

import circleFrag from './glsl/circle.frag'
import circleVert from './glsl/circle.vert'


const CircleShader = shaderMaterial(
  {

  },
  circleFrag,
  circleVert
);

// Renew when file is edited
CircleShader.key = MathUtils.generateUUID();
//@ Declare shader to typescript
extend({CircleMaterial: CircleShader})
declare global {
  namespace JSX {
    interface IntrinsicElements{
      circleMaterial: ReactThreeFiber.Object3DNode<ShaderMaterial, typeof ShaderMaterial>;
    }
  }
}
type Uniforms = {
  u? : {

  }
}

const CircleMaterial = memo(
   function CircleMaterial ({u, ...props}: Partial<ShaderMaterial> & Uniforms) {
    const meshRef = useRef<ShaderMaterial | null>(null)
    return(
      <circleMaterial
        ref={meshRef}
        key={CircleShader.key}
      />
    )
  }
,(prev, next) => prev !== next
);

export default CircleMaterial