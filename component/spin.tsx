import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import { Group, MathUtils } from "three";

export enum SpinState {
  STOP = 'stop',
  SCROLL = 'scroll',
  INFINITE = 'infinite',
}

export default function Spin({
  children,
  rotate = SpinState.STOP,
  scrollOffset = 0,
  position = [0, 0, 0],
}: {
  children: ReactNode;
  position?: [number, number, number];
  scrollOffset?: number;
  rotate?: SpinState;
}) {
  const rotateRef = useRef<SpinState>(rotate);
  const groupRef = useRef<Group | null>(null);
  const scroll = useScroll();
  const doRotate = useCallback((delta: number) => {
    
    if (groupRef.current && rotateRef.current) {
      const value = MathUtils.clamp(scroll.offset, scrollOffset, 1)
      switch (rotateRef.current) {
        case SpinState.INFINITE:
          groupRef.current.rotation.y += -delta / 2;
          break;
        case SpinState.SCROLL:
          if(scrollOffset <= scroll.offset) {
            groupRef.current.rotation.y = -MathUtils.degToRad( value * 180);
          }
          else {
            groupRef.current.rotation.y = -MathUtils.degToRad(scrollOffset * 180)
          }
          break;
        default:
          break;
      }
    }
  }, [scroll.offset, scrollOffset])

  useEffect(()=>{
    doRotate(0)
  },[doRotate])

  useFrame((state, delta) => {
    doRotate(delta)
  });

  return (
    <group
      ref={groupRef}
      position={position}
    >
      {children}
    </group>
  );
}
