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
import { World } from "@/components/canvas/World1";
import useWorld from "@/components/canvas/World1/useWorld";
import TeleportMessage from "@/components/dom/TeleportMessage";

export default function Page() {
    const block = useWorld((state: any) => state.block);
    return (
        <>
            <div>
                {/* <WelcomeMessage /> */}
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
                    <Player useWorld={useWorld}  playercamera={'thirdperson'}  />
                </View>
                <TeleportMessage useWorld={useWorld}  />
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
