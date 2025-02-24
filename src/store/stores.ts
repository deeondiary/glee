import { create } from 'zustand'
import {AuthState, createAuthSlice} from "@/src/store/auth-store";
import {createHeaderSlice, HeaderState} from "@/src/store/header-store";
import { devtools, persist } from 'zustand/middleware'
import {createSelectSlice, SelectState} from "@/src/store/select-store";

export type BoundState = {
    authState: AuthState,
    headerState: HeaderState,
    selectState: SelectState,
}
export type BoundStore = BoundState

export const useBoundStore = create<
    AuthState & HeaderState & SelectState
>()(
    devtools(
        persist(
            (...a) => (
                {
                    ...createAuthSlice(...a),
                    ...createHeaderSlice(...a),
                    ...createSelectSlice(...a),
                })
            ,{name: 'boundStore',
                partialize: (state) => ({
                    token: state.token,
                    nickname: state.nickname,
                    profile: state.profile,
                })
            }
        )))