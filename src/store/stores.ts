import { create } from 'zustand'
import {AuthState, createAuthSlice} from "@/src/store/auth-store";
import {createHeaderSlice, HeaderState} from "@/src/store/header-store";
import { devtools, persist } from 'zustand/middleware'

export type BoundState = {
    authState: AuthState,
    headerState: HeaderState,
}
export type BoundStore = BoundState

export const useBoundStore = create<
    AuthState & HeaderState
>()(
    devtools(
        persist(
            (...a) => (
                {
                    ...createAuthSlice(...a),
                    ...createHeaderSlice(...a),
                })
            ,{name: 'boundStore',
                partialize: (state) => ({
                    isLoggedIn: state.loginState,
                    // userToken : state.userToken,
                    // userBasicInfo : state.userBasicInfo,
                    // isLoggedIn : state.isLoggedIn,
                })
            }
        )))