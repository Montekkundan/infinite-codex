import { Icosahedron, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { MeshStandardMaterial, Vector3 } from "three";

type CameraView = 'thirdperson'; // Add other view types here

type PlayerProps = {
    camera?: CameraView;
};

enum Controls {
    forward = 'forward',
    back = 'back',
    left = 'left',
    right = 'right',
    jump = 'jump',
  }
const playerMaterial = new MeshStandardMaterial({color: 'mediumpurple', flatShading: true});
export default function Player({ camera }: PlayerProps) {
    const {rapier, world} = useRapier();
    const rigidBody = useRef<RapierRigidBody>(null);
    const [sub, get] = useKeyboardControls<Controls>()


    const jump = () => {
        if(rigidBody.current){
        const origin = rigidBody.current.translation();
        origin.y -= 0.31;
        const direction = {x: 0, y: -1, z: 0};
        const ray = new rapier.Ray(origin, direction);
        const hit = world.castRay(ray, 10, true);
        if( hit && hit.toi < 0.15){
            rigidBody.current.applyImpulse({x:0, y:0.5, z:0}, true);
        }
        }
        
   
    }

    useEffect(() => {
        const unsub = sub(
            (state) => state.jump,
            (value) => {
                if(value)
                    jump()
            }
        )
        return () => {
            unsub()
        }
    }, [])

    useFrame((state, delta) => {
        
        const {forward, back, left, right} = get()

        const impulse = {x: 0, y: 0, z: 0};
        const torque = {x: 0, y: 0, z: 0};

        const impulseStrength = 0.6 * delta;
        const torqueStrength = 0.2 * delta;

        if(forward) {
            impulse.z -= impulseStrength;
            torque.x -= torqueStrength;
        }
        if(right)
    {
        impulse.x += impulseStrength
        torque.z -= torqueStrength
    }

    if(back)
    {
        impulse.z += impulseStrength
        torque.x += torqueStrength
    }
    
    if(left)
    {
        impulse.x -= impulseStrength
        torque.z += torqueStrength
    }
        if(rigidBody.current){

        rigidBody.current.applyImpulse(impulse, true);
        rigidBody.current.addTorque(torque, true);
        if (camera === 'thirdperson'){
        const bodyPosition = rigidBody.current.translation()

        
    const cameraPosition = new Vector3(bodyPosition.x, bodyPosition.y, bodyPosition.z);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new Vector3(bodyPosition.x, bodyPosition.y, bodyPosition.z);
    cameraTarget.y += 0.25;

    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(cameraTarget);
        }
        }

    });
    return<>
    <RigidBody ref={rigidBody} colliders="ball" restitution={0.2} friction={1} linearDamping={0.5} angularDamping={0.5}>
    <Icosahedron castShadow  args={[0.3, 1]} material={playerMaterial} />
    </RigidBody>
    </>
}