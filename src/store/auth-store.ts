import {StateCreator} from "zustand/index";

export interface AuthState {
    token: string | null;
    setToken: (token: string | null) => void;
    nickname: string | null;
    setNickname: (nickname: string | null) => void;
    profile: string | null;
    setProfile: (profile: string | null) => void;
    resetAuth: () => void;
    onboardingShow: boolean;
    setOnboardingShow: (onboarding: boolean) => void;
}
export const createAuthSlice: StateCreator<
    AuthState
> = (set) => ({
    token: null,
    setToken: (state: string|null) => set(() => ({token: state})),
    nickname: null,
    setNickname: (state: string|null) => set(() => ({nickname: state})),
    profile: null,
    setProfile: (state: string|null) => set(() => ({profile: state})),
    resetAuth: () => set(() => ({token: null, nickname: null, profile: null})),
    onboardingShow: true,
    setOnboardingShow: (onboarding: boolean) => set(() => ({onboardingShow: onboarding})),
})