import { shaderMaterial } from "@react-three/drei";
import { extend, ReactThreeFiber, useFrame } from "@react-three/fiber";
import React, { memo, useEffect, useRef } from "react";
import { Box3, MathUtils, ShaderMaterial } from "three";

import circleFrag from "./glsl/circle.frag";
import circleVert from "./glsl/circle.vert";

const CircleShader = shaderMaterial(
  {
    uMin: 0,
    uMax: 0,
    uTime: 0,
    uAspect: 0,
  },
  circleVert,
  circleFrag,
);

// Renew when file is edited
CircleShader.key = MathUtils.generateUUID();
//@ Declare shader to typescript
extend({ CircleMaterial: CircleShader });
declare global {
  namespace JSX {
    interface IntrinsicElements {
      circleMaterial: ReactThreeFiber.Object3DNode<
        ShaderMaterial,
        typeof ShaderMaterial
      >;
    }
  }
}

type Props = {
  rad: number;
};

const CircleMaterial = memo(
  function CircleMaterial({ ...props }: Partial<ShaderMaterial> & Props) {
    const materialRef = useRef<ShaderMaterial | null>(null);
    const boundingBoxRef = useRef<Box3>(new Box3());

    useFrame((state, d) => {
      if (materialRef?.current) {
        materialRef.current.uniforms.uAspect.value = state.viewport.aspect;
        materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      }
    });

    const firstUpdate = (self: any) => {
      try {
        self.__r3f.parent.geometry.computeBoundingBox();
        self.__r3f.parent.geometry.center();
      } catch (error) {
        console.warn("A Circle material failed to compute bounding box.");
      } finally {
        const newBox = self?.__r3f.parent.geometry.boundingBox || null;
        self.__r3f.parent.geometry.rotateX((-1 * Math.PI) / 2);
        boundingBoxRef.current = newBox;
      }
    };

    useEffect(() => {
      if (materialRef.current) {
        console.log("updated");
        materialRef.current.uniforms.uMin.value = boundingBoxRef.current.min;
        materialRef.current.uniforms.uMax.value = boundingBoxRef.current.max;
      }
    }, []);

    return (
      <circleMaterial
        ref={materialRef}
        transparent
        onUpdate={firstUpdate}
        key={CircleShader.key}
        uniforms={{
          uMin: {
            value: boundingBoxRef.current?.min,
          },
          uMax: {
            value: boundingBoxRef.current?.max,
          },
          uRad: {
            value: props.rad,
          },
          uTime: {
            value: 0,
          },
          uAspect: {
            value: 0,
          },
        }}
      />
    );
  },
  (prev, next) => prev != next,
);

export default CircleMaterial;
