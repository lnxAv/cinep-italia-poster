
import CircleMaterial from "@/styles/shader/circleMaterial/component";
import {  Center, Text, Text3D } from "@react-three/drei";
import { Canvas, Object3DNode, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";
import  { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { degToRad } from "three/src/math/MathUtils.js";

export default function Spin({children}: any) {
    const groupRef = useRef<Group | null>(null)
    useFrame((state, d)=>{
        if(groupRef.current){
            groupRef.current.rotation.y += -d / 2
        }
    })
    return (
        <group ref={groupRef}>
            {children}
        </group>
    )
}