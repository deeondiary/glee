import { create } from 'zustand'
import {AuthState, createAuthSlice} from "@/src/store/auth-store";
import {AiState, createAiSlice} from "@/src/store/ai-store";
import {createJSONStorage, devtools, persist} from 'zustand/middleware'
import {createSelectSlice, SelectState} from "@/src/store/select-store";

export type BoundState = {
    authState: AuthState,
    aiState: AiState,
    selectState: SelectState,
}
export type BoundStore = BoundState

export const useBoundStore = create<
    AuthState & AiState & SelectState
>()(
    devtools(
        persist(
            (...a) => (
                {
                    ...createAuthSlice(...a),
                    ...createAiSlice(...a),
                    ...createSelectSlice(...a),
                })
            ,{ name: 'boundStore',
                storage: createJSONStorage(() => localStorage),
                // partialize: (state) => ({
                //     token: state.token,
                //     nickname: state.nickname,
                //     profile: state.profile,
                // })
            }
        )))