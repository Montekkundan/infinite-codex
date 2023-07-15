import { Icosahedron, useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { RapierRigidBody, RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { MeshStandardMaterial, Vector3 } from "three";


const NPCMaterial = new MeshStandardMaterial({color: 'yellow', flatShading: true});
export default function NPC() {
    const rigidBody = useRef<RapierRigidBody>(null);

    return<>
    <RigidBody ref={rigidBody} type="fixed" colliders="ball" restitution={0.2} friction={1} linearDamping={ 0.5 } angularDamping={0.5} position={ [ 4, 0.5, 0 ]}>
    <Icosahedron castShadow  args={[0.3, 1]} material={NPCMaterial} />
    </RigidBody>
    </>
}