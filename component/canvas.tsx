"use client"

import { CameraControls, Text3D } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const font = {

}
export default function Pisa() {
    return (
        <Canvas>
            <CameraControls/>
            <Text3D>
                <meshToonMaterial/>
            </Text3d>
        </Canvas>
    )
}