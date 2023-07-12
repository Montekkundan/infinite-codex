import { Icosahedron, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { MeshStandardMaterial } from "three";
enum Controls {
    forward = 'forward',
    back = 'back',
    left = 'left',
    right = 'right',
    jump = 'jump',
  }
const playerMaterial = new MeshStandardMaterial({color: 'mediumpurple', flatShading: true});
export default function Player() {
    const body = useRef<any>();
    const [sub, get] = useKeyboardControls<Controls>()
    useFrame(() => {
        const {forward, back, left, right, jump} = get()

        const impluse = {x: 0, y: 0, z: 0};
        const torque = {x: 0, y: 0, z: 0};
    });
    return<>
    <RigidBody ref={body} colliders="ball" restitution={0.2} friction={1}>
    <Icosahedron castShadow  args={[0.3, 1]} material={playerMaterial} />
    </RigidBody>
    </>
}