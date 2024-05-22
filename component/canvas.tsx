"use client"

import CircleMaterial from "@/styles/shader/circleMaterial/circleV2";
import {  Center, Scroll, ScrollControls, Text3D } from "@react-three/drei";
import { Canvas, Object3DNode } from "@react-three/fiber";
import  { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { degToRad } from "three/src/math/MathUtils.js";
import Spin from "./spin";
import { Flag } from "./flag";

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

const TextRow = ({...props}: {rotate?: boolean, offset?: [number,number,number], radius?: number}) => {
    return (
        <Spin rotate={props.rotate} position={props.offset}>
            <Text3D {...textProps} rotation={[degToRad(90),0,degToRad(70)]}>
                CinemaCinema
                <CircleMaterial rad={props.radius || 1}/>
            </Text3D>
            <Text3D {...textProps} position={[0,-1.2,0]} rotation={[degToRad(90),0, degToRad(70)]}>
                PublicPublic
                <CircleMaterial  rad={props.radius || 1}/>
            </Text3D>
        </Spin>
    )
}

export default function Pisa() {
    return (
        <Canvas camera={{position: [0,0,6]}}>
           <group position={[1,0,0]} rotation={[0, 0, -degToRad(3.9)]}>
            <Center disableY>
                <group position={[0,2,-4]} rotation={[0, 0, -degToRad(3.9)]}>
                    <ScrollControls pages={2} damping={0.1} >
                        <Scroll>
                            <Flag />
                            <TextRow radius={1.5} rotate/>
                            <TextRow radius={2} offset={[0,-2.4,0]}/>
                            <TextRow radius={2} offset={[0,-4.9,0]}/>
                            <TextRow radius={2} offset={[0,-7.4,0]}/>
                            <TextRow radius={2} offset={[0,-9.9,0]}/>
                        </Scroll>
                    </ScrollControls>
                </group>
                </Center>
            </group>
        </Canvas>
    )
}