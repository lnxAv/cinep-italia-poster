import { Sphere } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { useMemo } from "react"
import { Shape as ShapeType } from "three"
import { SVGLoader } from "three/examples/jsm/Addons.js"
import { degToRad } from "three/src/math/MathUtils.js"


const Shape = ({shape}: {shape: ShapeType}) => {

    return (
        <mesh>
            <shapeGeometry args={[shape]} />
            <meshBasicMaterial color={'#f5f178'} />
        </mesh>
    )
}

export const Flag = () => {
    const data = useLoader(SVGLoader, 'flag.svg')
    const svg = useMemo(
        () => data.paths.flatMap(
            (g, index) => g.toShapes(true).map(
                (shape) => ({ shape, color: '#f5f178', index }

                )
            )
        )
    , [data])

    return (
        <group scale={[0.02, -0.02, 0.02]} position={[-0.1,3.35,0]} rotation={[0,0,0]}>
            {svg.map(item => 
                <Shape key={item.shape.uuid} shape={item.shape}/>
            )}
        </group>
    )
}