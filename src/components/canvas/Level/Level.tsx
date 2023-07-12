import { Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody, useRapier } from "@react-three/rapier";
import { useMemo, useRef, useState } from "react";
import { BoxGeometry, DoubleSide, Euler, Mesh, MeshStandardMaterial, Quaternion } from "three";
const boxGeometry = new BoxGeometry(1, 1, 1);
const floor1Material = new MeshStandardMaterial({color: 'green'});
const floor2Material = new MeshStandardMaterial({color: 'greenyellow'});
const obstacleMaterial = new MeshStandardMaterial({color: 'orangered'});
const wallMaterial = new MeshStandardMaterial({color: 'slategrey'});

type BlockProps = {
    position: [number, number, number];
};
function BlockStart({position=[0,0,0]}: BlockProps) {
    return (
        <>
            <group position={position}>
                <mesh geometry={boxGeometry} material={floor1Material} position={[0, -0.1, 0]} scale={[4, 0.2,4]} receiveShadow />
            </group>
        </>
    );
}

function BlockEnd({position=[0,0,0]}: BlockProps) {
    return (
        <>
            <group position={position}>
                <mesh geometry={boxGeometry} material={floor1Material} position={[0, 0, 0]} scale={[4, 0.2,4]} receiveShadow />
            </group>
        </>
    );
}

export function BlockSpinner({position=[0,0,0]}: BlockProps) {
    const obstacle = useRef<any>(null);
    const [speed] = useState(() => (((Math.random() + 0.2) * (Math.random() > 0.5 ? -1 : 1))));

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const rotation = new Quaternion()
        rotation.setFromEuler(new Euler(0, time * speed, 0))
        obstacle.current?.setNextKinematicRotation(rotation);
    });

    return (
        <>
            <group position={position}>
            <RigidBody ref={obstacle} type="kinematicPosition" position={[0,0.3,0]} restitution={0.3} friction={0}>
                <Box material={obstacleMaterial} scale={[3.5, 0.3,0.3]}  castShadow receiveShadow />
                </RigidBody>
                <Box material={floor2Material} position={[0, -0.1, 0]} scale={[4, 0.2,4]} receiveShadow />
                
                
            </group>
        </>
    );
}

export function BlockLimbo({position=[0,0,0]}: BlockProps) {
    const obstacle = useRef<any>(null);
    const [timeoffset] = useState(() => (((Math.random() + 0.2) * Math.PI * 2)));

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const y = Math.sin(time + timeoffset) +  1.15
        obstacle.current?.setNextKinematicTranslation({x:position[0], y:y, z:position[2]});
    });

    return (
        <>
            <group position={position}>
            <RigidBody ref={obstacle} type="kinematicPosition" position={[0,0.3,0]} rotation={[Math.PI / 2, 0, 0]} restitution={0.3} friction={0}>
                <Box material={obstacleMaterial} scale={[3.5, 0.3,0.3]}    castShadow receiveShadow  />
                </RigidBody>
                <Box material={floor2Material} position={[0, -0.1, 0]} scale={[4, 0.2,4]} receiveShadow />
                
                
            </group>
        </>
    );
}

export function BlockAxe({position=[0,0,0]}: BlockProps) {
    const obstacle = useRef<any>(null);
    const [timeoffset] = useState(() => (((Math.random() + 0.2) * Math.PI * 2)));

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const x = Math.sin(time + timeoffset) * 1.25
        obstacle.current?.setNextKinematicTranslation({x:position[0] + x, y: position[1] + 0.75, z:position[2]});
    });

    return (
        <>
            <group position={position}>
            <RigidBody ref={obstacle} type="kinematicPosition" position={[0,0.3,0]} rotation={[0, 0, Math.PI / 2]} restitution={0.3} friction={0}>
                <Box material={obstacleMaterial} scale={[1.5,1.5,0.3]} castShadow receiveShadow />
                </RigidBody>
                <Box material={floor2Material} position={[0, -0.1, 0]} scale={[4, 0.2,4]} receiveShadow />
                
                
            </group>
        </>
    );
}

function Bounds({length = 1}){
    return<>
    <RigidBody type="fixed" restitution={0.2} friction={0}>
    <Box position={[2.15, 0.75, - ( length* 2) + 2]} material={wallMaterial} scale={[0.3, 1.5, 4 * length]} castShadow />
    <Box position={[-2.15, 0.75, - ( length* 2) + 2]} material={wallMaterial} scale={[0.3, 1.5, 4 * length]} receiveShadow />
    <Box position={[0, 0.75, - ( length* 4) + 2]} material={wallMaterial} scale={[4, 1.5, 0.3]} receiveShadow />
    <CuboidCollider args={[2, 0.1, 2 * length]} position={[0, -0.1, - ( length * 2) + 2]} restitution={0.2} friction={1} />
    <CuboidCollider args={[2, 2, 0.5]} position={[0, -0.1, 2.5]} restitution={0.2} friction={0} />
    </RigidBody>
    </>
}

export function Level({count = 5, types = [BlockSpinner, BlockLimbo, BlockAxe]}){

   const blocks = useMemo(() => {
    const blocks: any[] = []

    for(let i = 0 ; i < count; i++){
        const type = types[Math.floor(Math.random() * types.length )]
        blocks.push(type)
    }
    return blocks;
   }, [count, types]);
    return <>
    <BlockStart position={[0, 0,0]}/>
    {blocks.map((Block, index) => <Block key={index} position={[0, 0, -4 * (index + 1)]}/>)}
    <BlockEnd position={[0, 0, -(count + 1) * 4]}/>
    <Bounds length={count + 2} />
    </>;
}

