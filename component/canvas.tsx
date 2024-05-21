"use client"

import CircleMaterial from "@/styles/shader/circleMaterial/componentV2";
import {  Center, Scroll, ScrollControls, Text3D } from "@react-three/drei";
import { Canvas, Object3DNode } from "@react-three/fiber";
import  { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { degToRad } from "three/src/math/MathUtils.js";
import Spin from "./spin";

declare module "@react-three/fiber" {
    interface ThreeElements {
        textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
    }
}
const textProps = {
    font: './Rubik Mono One_Regular.json',
    size: 0.8,
    height: 0.01,
    curveSegments: 32,
    amount: 0.11,
}

export default function Pisa() {
    return (
        <Canvas camera={{position: [0,0,6]}}>
           <group position={[1,0,0]} rotation={[0, 0, -degToRad(3.9)]}>
                <Center rotation={[0, 0, -degToRad(3.9)]}>
                    <ScrollControls pages={3} damping={0.1} >
                        <Scroll>
                        <Spin>
                        <Text3D {...textProps} rotation={[degToRad(90),0,degToRad(70)]}>
                            CinemaCinema
                            <CircleMaterial rad={1.5}/>
                        </Text3D>
                        <Text3D {...textProps} position={[0,-1.1,0]} rotation={[degToRad(90),0, degToRad(70)]}>
                            PublicPublic
                            <CircleMaterial rad={1.5}/>
                        </Text3D>
                        </Spin>
                        <Text3D {...textProps} position={[0,-2.1,0]} rotation={[degToRad(90),0, degToRad(70)]}>
                            CinemaCinema
                            <CircleMaterial rad={2}/>
                        </Text3D>
                        <Text3D {...textProps} position={[0,-3.1,0]} rotation={[degToRad(90),0, degToRad(70)]}>
                            PublicPublic
                            <CircleMaterial rad={2}/>
                        </Text3D>
                        <Spin>
                            <Text3D {...textProps} position={[0,-4.1,0]} rotation={[degToRad(90),0,degToRad(70)]}>
                                CinemaCinema
                                <CircleMaterial rad={2}/>
                            </Text3D>
                            <Text3D {...textProps} position={[0,-5.1,0]} rotation={[degToRad(90),0, degToRad(70)]}>
                                PublicPublic
                                <CircleMaterial rad={2}/>
                            </Text3D>
                        </Spin>
                        <Text3D {...textProps} position={[0,-6.1,0]} rotation={[degToRad(90),0,degToRad(70)]}>
                            CinemaCinema
                            <CircleMaterial rad={2}/>
                        </Text3D>
                        <Text3D {...textProps} position={[0,-7.1,0]} rotation={[degToRad(90),0, degToRad(70)]}>
                            PublicPublic
                            <CircleMaterial rad={2}/>
                        </Text3D>
                        </Scroll>
                    </ScrollControls>
                </Center>
            </group>
        </Canvas>
    )
}