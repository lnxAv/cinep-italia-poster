"use client";

import CircleMaterial from "@/styles/shader/circleMaterial/circleV2";
import {
  Center,
  Preload,
  Scroll,
  ScrollControls,
  Text3D,
} from "@react-three/drei";
import { Canvas, Object3DNode } from "@react-three/fiber";
import { degToRad } from "three/src/math/MathUtils.js";
import Spin, { SPIN_STATE } from "./spin";
import { Flag } from "./flag";
import Image from "next/image";
import { TextGeometry } from "three/examples/jsm/Addons.js";



declare module "@react-three/fiber" {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
  }
}

const textProps = {
  font: "./Rubik Mono One_Regular.json",
  size: 0.8,
  height: 0.01,
  curveSegments: 32,
  amount: 0.11,
};


const TextRow = ({
  ...props
}: {
  rotate?: SPIN_STATE;
  offset?: [number, number, number];
  scrollOffset?: number,
  radius?: number;
}) => {

  return (
    <Spin rotate={props.rotate} position={props.offset} scrollOffset={props.scrollOffset}>
      <Text3D {...textProps} rotation={[degToRad(90), 0, degToRad(70)]}>
        CinemaCinema
        <CircleMaterial rad={props.radius || 1} />
      </Text3D>
      <Text3D
        {...textProps}
        position={[0, -1.2, 0]}
        rotation={[degToRad(90), 0, degToRad(70)]}
      >
        PublicPublic
        <CircleMaterial rad={props.radius || 1} />
      </Text3D>
    </Spin>
  );
};

export default function Pisa() {
  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      <Preload all/>
      <group position={[1, 0, 0]} rotation={[0, 0, -degToRad(3.9)]}>
        <Center disableY>
          <group position={[0, 2, -4]} rotation={[0, 0, -degToRad(3.9)]}>
            <ScrollControls pages={2} damping={0.1}>
              <Scroll>
                <Flag />
                <TextRow radius={1.5} rotate={SPIN_STATE.infinite} />
                <TextRow radius={2} rotate={SPIN_STATE.scroll} offset={[0, -2.4, 0]} scrollOffset={1/6}/>
                <TextRow radius={2} rotate={SPIN_STATE.scroll} offset={[0, -4.9, 0]} scrollOffset={2/6}/>
                <TextRow radius={2} rotate={SPIN_STATE.scroll} offset={[0, -7.4, 0]} scrollOffset={3/6}/>
                <TextRow radius={2} rotate={SPIN_STATE.scroll} offset={[0, -9.9, 0]} scrollOffset={4/6}/>
              </Scroll>
              <Scroll html>
                <div
                  style={{ position: "relative", top: "170vh", width: "100vw" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div>
                        coded by{" "}
                        <a
                          href="https://ca.linkedin.com/in/pierrewrabel/en"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Pierre-wesner Rabel
                        </a>{" "}
                        .
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        <a
                          href="https://github.com/lnxAv"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            width={50}
                            height={50}
                            src={"/github-mark-white.png"}
                            alt="GitHub"
                          />
                        </a>
                        <a
                          href="https://ca.linkedin.com/in/pierrewrabel/en"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            width={50}
                            height={50}
                            src={"/in-mark.png"}
                            alt="LinkedIn"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Scroll>
            </ScrollControls>
          </group>
        </Center>
      </group>
    </Canvas>
  );
}
