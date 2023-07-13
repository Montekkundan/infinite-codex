import { Icosahedron, useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { RapierRigidBody, RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { MeshStandardMaterial, Vector3 } from "three";

type CameraView = 'thirdperson' | 'lookAt'; // Add other view types here

type PlayerProps = {
    playercamera?: CameraView;
    useWorld?: any;
};

enum Controls {
    forward = 'forward',
    back = 'back',
    left = 'left',
    right = 'right',
    jump = 'jump',
  }
const playerMaterial = new MeshStandardMaterial({color: 'mediumpurple', flatShading: true});
export default function Player({ playercamera, useWorld }: PlayerProps) {
    const {rapier, world} = useRapier();
    const rigidBody = useRef<RapierRigidBody>(null);
    const [sub, get] = useKeyboardControls<Controls>()
    const [smoothedCameraPosition] = useState(() => new Vector3());
    const [smoothedCameraTarget] = useState(() => new Vector3());
    const start = useWorld((state : any) => state.start)
    const teleport = useWorld((state : any) => state.teleport)
    const restart = useWorld((state : any) => state.restart)
    const blockCount = useWorld((state : any) => state.block)
    


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

    const reset = () => {
        if(rigidBody.current){
        rigidBody.current.setTranslation({x: 0, y: 1, z: 0}, true);
        rigidBody.current.setLinvel({x: 0, y: 1, z: 0}, true);
        rigidBody.current.setAngvel({x: 0, y: 1, z: 0}, true);
        }
    }

   

    useEffect(() => {
        const unsubReset = useWorld.subscribe(
            (state: any) => state.phase,
            (value : any) => {
                if(value === 'ready')
                    reset()
            }
        )

        const unsub = sub(
            (state) => state.jump,
            (value) => {
                if(value)
                    jump()
            }
        )

        const unsubAny = sub(
            () => {
                start()
            }
        )

        return () => {
            unsub()
            unsubAny()
            unsubReset()
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
        rigidBody.current.applyTorqueImpulse(torque, true);
        const bodyPosition = rigidBody.current.translation()
        const cameraPosition = new Vector3(bodyPosition.x, bodyPosition.y, bodyPosition.z);
        if (playercamera === 'thirdperson'){
             
            cameraPosition.z += 2.25;
            cameraPosition.y += 0.65;

            const cameraTarget = new Vector3(bodyPosition.x, bodyPosition.y, bodyPosition.z);
            cameraTarget.y += 0.25;

            smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
            smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

            state.camera.position.copy(cameraPosition);
            state.camera.lookAt(cameraTarget);
                }
        if (playercamera === 'lookAt') {
        const bodyPosition = rigidBody.current.translation()
        const cameraPosition = new Vector3(bodyPosition.x, bodyPosition.y + 2, bodyPosition.z + 5); // Offset for better view
        state.camera.position.lerp(cameraPosition, 5 * delta);
        state.camera.lookAt(new Vector3(bodyPosition.x, bodyPosition.y, bodyPosition.z));
    }

            if (bodyPosition.z < - (blockCount * 4 + 2))
            {

                teleport()
            }
            
        }

    });
    return<>
    <RigidBody ref={rigidBody} colliders="ball" restitution={0.2} friction={1} linearDamping={ 0.5 } angularDamping={0.5} position={ [ 0, 1, 0 ]}>
    <Icosahedron castShadow  args={[0.3, 1]} material={playerMaterial} />
    </RigidBody>
    </>
}