"use client";

import dynamic from "next/dynamic";

import Box from "@/components/canvas/Box";
import styled from "styled-components";
const View = dynamic(() => import("@/components/canvas/View"), {
    ssr: false,
    loading: () => (
        <StyledLoading>
            <p>Loading...</p>
        </StyledLoading>
    ),
});

import Player from "@/components/canvas/Player/Player";
import { World } from "@/components/canvas/HomeWorld";
import useWorld from "@/components/canvas/HomeWorld/useWorld";
import TeleportMessage from "@/components/dom/TeleportMessage";
import UI from "@/components/dom/UI";

export default function Page() {
    const block = useWorld((state: any) => state.block);
    return (
        <>

            <div>
                <View
                    orbit={true}
                    style={{
                        display: "flex",
                        position: "absolute",
                        top: 0,
                        height: "100vh",
                        width: "100%",
                    }}
                >

                    <World  count={block}/>
                   
                    <Player useWorld={useWorld}/>
                    
                </View>
                <UI />
                <TeleportMessage useWorld={useWorld} url="worlds/branch-bay"  />
            </div>
        </>
    );
}

const StyledLoading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
`;
