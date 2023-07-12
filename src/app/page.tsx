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

import WelcomeMessage from "@/components/dom/WelcomeMessage";
import Plane from "@/components/canvas/Plane/Plane";
import {BlockLimbo, Level} from "@/components/canvas/Level/Level";
import Player from "@/components/canvas/Player/Player";

export default function Page() {
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
                    
                    {/* <Box color={"#c1b61f"} hoverColor={"#2d52ad"} /> */}
                    {/* <Plane /> */}
                    <Level />
                    <Player />
                </View>
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
