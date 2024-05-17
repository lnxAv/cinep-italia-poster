import { shaderMaterial } from '@react-three/drei';
import { extend, ReactThreeFiber, useFrame } from '@react-three/fiber';
import React, { memo, useEffect, useRef } from 'react';
import { DoubleSide, MathUtils, NormalBlending, ShaderMaterial } from 'three';

import fragment from './glsl/cartesian.frag';
import vertex from './glsl/cartesian.vert';

const CartesianMaterial = shaderMaterial(
  {
    cartesianX: Math.PI * 1.15,
    cartesianY: Math.PI * 1.15,
    cartesianZ: Math.PI * 1.15,
    width: 1,
    sharpness: 1,
    acceleration: 0,
    opacityA: 1,
    opacityB: 0,
    time: 0,
    hue: [244, 47, 213],
  },
  vertex,
  fragment
);

// This is the 🔑 that HMR will renew if this file is edited
// It works for THREE.ShaderMaterial as well as for drei/shaderMaterial
// @ts-ignore
CartesianMaterial.key = MathUtils.generateUUID();

extend({ CartesianMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      cartesianMaterial: ReactThreeFiber.Object3DNode<ShaderMaterial, typeof ShaderMaterial>;
    }
  }
}

type Uniforms = {
  u?: {
    cartesianX?: number;
    cartesianY?: number;
    cartesianZ?: number;
    width?: number;
    sharpness?: number;
    opacityA?: number;
    opacityB?: number;
    hue?: [number, number, number];
  };
  acceleration?: number;
};

const CartesianShader = memo(
  ({ u, acceleration, ...props }: Partial<ShaderMaterial> & Uniforms) => {
    const meshRef = useRef<ShaderMaterial>(null);

    useEffect(() => {
      if (meshRef?.current) {
        meshRef.current.uniforms.cartesianX.value = u?.cartesianX !== undefined ? u.cartesianX : 2;
        meshRef.current.uniforms.cartesianY.value = u?.cartesianY !== undefined ? u.cartesianY : 2;
        meshRef.current.uniforms.cartesianZ.value = u?.cartesianZ !== undefined ? u.cartesianZ : 2;
        meshRef.current.uniforms.width.value = u?.width !== undefined ? u.width : 1.1;
        meshRef.current.uniforms.sharpness.value = u?.sharpness !== undefined ? u.sharpness : 1;
        meshRef.current.uniforms.opacityA.value = u?.opacityA !== undefined ? u.opacityA : 1;
        meshRef.current.uniforms.opacityB.value = u?.opacityB !== undefined ? u.opacityB : 1;
        const newHue = [u?.hue?.[0] || 0, u?.hue?.[1] || 0, u?.hue?.[2] || 0];
        meshRef.current.uniforms.hue.value = newHue;
      }
    }, [meshRef, u]);

    useFrame((time, delta) => {
      if (meshRef?.current) {
        meshRef.current.uniforms.time.value = time.clock.elapsedTime + delta;
      }
    });

    return (
      <cartesianMaterial
        ref={meshRef}
        key={CartesianMaterial.key}
        precision="lowp"
        blending={NormalBlending}
        side={props.side ? props.side : DoubleSide}
        transparent
        {...props}
      />
    );
  },
  (prev, next) => prev !== next
);

export default CartesianShader;
