"use client"

import CircleMaterial from "@/styles/shader/circleMaterial/component";
import { CameraControls, Center, Text3D } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const textProps = {
    font: './Rubik Mono One_Regular.json',
}

export default function Pisa() {
    return (
        <Canvas>
            <CameraControls/>
            <Center>
                <Text3D {...textProps}>
                    hello
                    <CircleMaterial/>
                </Text3D>
            </Center>
        </Canvas>
    )
}