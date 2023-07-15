import {create} from "zustand";
import {subscribeWithSelector} from "zustand/middleware";

export default create(subscribeWithSelector((set) => {
    return {
        block : 0,

        phase: 'ready',

        start: () => {

            set((state: any) => {
                if(state.phase === 'ready' || state.phase === 'teleport') 
                    return {phase: 'running'}
                return {}
            })
        },

        restart: () => {

            set((state: any) => {
                if(state.phase === 'running' || state.phase === 'teleport') 
                    return {phase: 'ready'}
                return {}
            })
        },

        teleport: () => {

            set((state: any) => {
                if(state.phase === 'running') 
                    return {phase: 'teleport'}
                return {}
            })
        }

    }
}))