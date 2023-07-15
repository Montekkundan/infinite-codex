import { Box, Float, Text} from "@react-three/drei";
import { CuboidCollider, RigidBody, useRapier } from "@react-three/rapier";
import { useMemo, useRef, useState } from "react";
import { BoxGeometry, DoubleSide, Euler, Mesh, MeshStandardMaterial, Quaternion } from "three";
const boxGeometry = new BoxGeometry(1, 1, 1);
const floorMaterial = new MeshStandardMaterial({color: 'green'});
const startMaterial = new MeshStandardMaterial({color: 'yellow'});
const teleportMaterial = new MeshStandardMaterial({color: 'red'});

type BlockProps = {
    position: [number, number, number];
};
function BlockStart({position=[0,0,0]}: BlockProps) {
    return (
        <>
            <group position={position}>
                <Float>
                    <Text font="/bebas-neue-v9-latin-regular.woff"
                scale={ 0.5 }
                maxWidth={ 0.25 }
                lineHeight={ 0.75 }
                textAlign="right"
                position={ [ 0.75, 0.65, 0 ] }
                rotation-y={ - 0.25 }> 
                Branch Bay
                <meshBasicMaterial toneMapped={ false } />
                </Text>
                </Float>
                <Box  material={startMaterial} position={[0, -0.1, 0]} scale={[4, 0.2,4]} receiveShadow />
            </group>
        </>
    );
}

function BlockEnd({position=[0,0,0]}: BlockProps) {
    return (
        <>
            <group position={position}>
                <Box  material={teleportMaterial} position={[0, 0, 0]} scale={[4, 0.2,4]} receiveShadow />
            </group>
        </>
    );
}

function Plane({position=[0,0,0]}: BlockProps) {
    return (
        <group position={position}>
            <RigidBody type="fixed" scale={[50, 0.1,50]} restitution={0.2} friction={0}>
                <Box  material={floorMaterial} position={[0, 0, 0]}  receiveShadow />
                </RigidBody>
            </group>
    );
  }


function Bounds({length = 1}){
    return<>
    <RigidBody type="fixed" restitution={0.2} friction={0}>
    <CuboidCollider args={[2, 0.1, 2]} position={[0, 0.2, 0]} restitution={0.2} friction={1} />
    <CuboidCollider args={[2, 0.1, 2]} position={[0, 0.5, - 4]} restitution={0.2} friction={1} />
    <CuboidCollider args={[6, 2, 0.5]} position={[0, -0.1, 2.5]} restitution={0.2} friction={0} />
    </RigidBody>
    </>
}

export function World({count = 0}){
    return <>
    <BlockStart position={[0, 0.3, 0]} />
        <BlockEnd position={[0, 0.5, -4]} />
    <Plane position={[0, 0.1, -10]}/>
     <Bounds  /> 
     <Box  material={floorMaterial} position={[0, 5, -37]} scale={[50, 10,4]}   receiveShadow />
    </>;
}

