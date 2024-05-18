"use client"

import CircleMaterial from "@/styles/shader/circleMaterial/component";
import { CameraControls, Center, Text3D } from "@react-three/drei";
import { Canvas, ThreeElements } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { BufferGeometry, Mesh } from "three";

const textProps = {
    font: './Rubik Mono One_Regular.json',
}

export default function Pisa() {
    const textRef = useRef<Mesh>(null!)
    const [box, setBox] = useState<BufferGeometry>(null!)
    useEffect(()=>{
        const box = textRef.current.geometry.computeBoundingBox()
        setBox(box)
    },[])

    return (
        <Canvas>
            <CameraControls/>
            <Center>
                <Text3D ref={textRef} {...textProps}>
                    hello
                    <CircleMaterial/>
                </Text3D>
            </Center>
        </Canvas>
    )
}