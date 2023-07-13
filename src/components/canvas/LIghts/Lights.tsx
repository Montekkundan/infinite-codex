import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Lights = () => {
    const light = useRef<any>();
    useFrame((state) => {
        light.current.position.z = state.camera.position.z + 3;
        light.current.target.position.z = state.camera.position.z - 4;
        light.current.target.updateMatrixWorld()
    })
    return <>
    <ambientLight intensity={0.1} />
    <directionalLight
    ref={light}
    castShadow
    position={ [ 4, 4, 1 ] }
    intensity={ 1.5 }
    shadow-mapSize={ [ 1024, 1024 ] }
    shadow-camera-near={ 1 }
    shadow-camera-far={ 10 }
    shadow-camera-top={ 10 }
    shadow-camera-right={ 10 }
    shadow-camera-bottom={ - 10 }
    shadow-camera-left={ - 10 }
/>
    </>;
}
export default Lights;