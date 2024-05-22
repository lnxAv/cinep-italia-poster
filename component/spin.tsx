import { useFrame } from "@react-three/fiber";
import { ReactNode, useRef } from "react";
import { Group } from "three";

export default function Spin({
  children,
  rotate = false,
  position = [0, 0, 0],
}: {
  children: ReactNode;
  position?: [number, number, number];
  rotate?: boolean;
}) {
  const rotateRef = useRef<boolean>(rotate);
  const groupRef = useRef<Group | null>(null);
  useFrame((state, d) => {
    if (groupRef.current && rotate) {
      groupRef.current.rotation.y += -d / 2;
    }
  });
  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={() => {
        rotateRef.current = true;
      }}
    >
      {children}
    </group>
  );
}
