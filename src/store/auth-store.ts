import {StateCreator} from "zustand/index";

export interface AuthState {
    loginState: boolean;
    setLoginState: (state: boolean) => void;
}
export const createAuthSlice: StateCreator<
    AuthState
> = (set) => ({
    loginState: false,
    setLoginState: (state: boolean) => set(() => ({ loginState: state })),
})