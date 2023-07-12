// Component from Renaud ROHLINGER <https://twitter.com/onirenaud
"use client";

import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { OrbitControls, View as ViewImpl } from "@react-three/drei";

import { Three } from "@/helpers/components/Three";
type ViewProps = {
    children: any;
    orbit?: any;
    style?: any;
};



const View = forwardRef(({ children, orbit, ...props }: ViewProps, ref) => {
    const localRef = useRef<any>(null);
    useImperativeHandle(ref, () => localRef.current);
    const tracking: any = useRef();


    return (
        <>
            <div ref={tracking} {...props} />
            <Three>
         
                <ViewImpl track={tracking}>
                    {children}
                    {orbit && <OrbitControls />}
                </ViewImpl>
             
            </Three>
        </>
    );
});
View.displayName = "View";

export default View;
