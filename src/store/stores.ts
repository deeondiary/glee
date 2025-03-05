import { create } from 'zustand'
import {AuthState, createAuthSlice} from "@/src/store/auth-store";
import {AiState, createAiSlice} from "@/src/store/ai-store";
import {createJSONStorage, devtools, persist} from 'zustand/middleware'
import {createSuggestionSlice, SuggestionState} from "@/src/store/suggestion-store";

export type BoundState = {
    authState: AuthState,
    aiState: AiState,
    suggestionState: SuggestionState,
}
export type BoundStore = BoundState

export const useBoundStore = create<
    AuthState & AiState & SuggestionState
>()(
    devtools(
        persist(
            (...a) => (
                {
                    ...createAuthSlice(...a),
                    ...createAiSlice(...a),
                    ...createSuggestionSlice(...a),
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