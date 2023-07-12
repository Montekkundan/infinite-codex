"use client";

import { Canvas } from "@react-three/fiber";
import { KeyboardControls, KeyboardControlsEntry, Preload } from "@react-three/drei";
import { webgl } from "@/helpers/global";
import { useMemo } from "react";

enum Controls {
    forward = 'forward',
    back = 'back',
    left = 'left',
    right = 'right',
    jump = 'jump',
  }

export default function Scene({ ...props }) {
    const map = useMemo<KeyboardControlsEntry<Controls>[]>(()=>[
        { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
        { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
        { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
        { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
        { name: Controls.jump, keys: ['Space'] },
      ], [])
    // Everything defined in here will persist between route changes, only children are swapped
    return (
        <KeyboardControls map={map}>
        <Canvas shadows
        {...props} >
            <webgl.Out />
            <Preload all />
        </Canvas>
        </KeyboardControls>
    );
}
