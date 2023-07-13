import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export default function Camera() {
    const { camera, set } = useThree();

    useEffect(() => {
      camera.position.set(1, 1, 2);
      set({ camera });
    }, [camera, set]);
    return null;
}