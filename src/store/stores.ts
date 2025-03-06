import { create } from 'zustand'
import {AuthState, createAuthSlice} from "@/src/store/auth-store";
import {createTemplateSlice, TemplateState} from "@/src/store/template-store";
import {createJSONStorage, devtools, persist} from 'zustand/middleware'
import {createSuggestionSlice, SuggestionState} from "@/src/store/suggestion-store";

export type BoundState = {
    authState: AuthState,
    templateState: TemplateState,
    suggestionState: SuggestionState,
}
export type BoundStore = BoundState

export const useBoundStore = create<
    AuthState & TemplateState & SuggestionState
>()(
    devtools(
        persist(
            (...a) => (
                {
                    ...createAuthSlice(...a),
                    ...createTemplateSlice(...a),
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