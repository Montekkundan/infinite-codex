import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { DoubleSide, Mesh } from "three";

const Plane = () => {
    const mesh = useRef<Mesh>(null!);
    // useFrame(() => {
    //     if (mesh.current)
    //         mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    // });
    return (
        <mesh
            ref={mesh}
            position={[0, -1, 0]}
            rotation-x={-Math.PI / 2}
            
        >
            <planeGeometry  args={[5, 5]} />
            <meshStandardMaterial color='red' side={DoubleSide} />
        </mesh>
    );
}
export default Plane;