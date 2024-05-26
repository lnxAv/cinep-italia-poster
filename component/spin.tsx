import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { ReactNode, useEffect, useRef } from "react";
import { Group, MathUtils } from "three";

export enum SPIN_STATE {
  stop = 'stop',
  scroll = 'scroll',
  infinite = 'infinite',
}

export default function Spin({
  children,
  rotate = SPIN_STATE.stop,
  scrollOffset = 0,
  position = [0, 0, 0],
}: {
  children: ReactNode;
  position?: [number, number, number];
  scrollOffset?: number;
  rotate?: SPIN_STATE;
}) {
  const rotateRef = useRef<SPIN_STATE>(rotate);
  const groupRef = useRef<Group | null>(null);
  const scroll = useScroll();
  const doRotate = (delta: number) => {
    if (groupRef.current && rotateRef.current) {
      switch (rotateRef.current) {
        case SPIN_STATE.infinite:
          groupRef.current.rotation.y += -delta / 2;
          break;
        case SPIN_STATE.scroll:
          let value = MathUtils.clamp(scroll.offset, scrollOffset, 1)
          if(scrollOffset <= scroll.offset) {
            groupRef.current.rotation.y = -MathUtils.degToRad( value * 180);
          }
          else {
            groupRef.current.rotation.y = -MathUtils.degToRad(scrollOffset * 180)
          }
        default:
          break;
      }
    }
  }

  useEffect(()=>{
    doRotate(0)
  },[])

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
