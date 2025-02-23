/*
currentPage
- main 메인페이지 ('/')
- select 상황 선택 페이지 ('/select')
- template 템플릿 페이지
- login 로그인 페이지
 */
import {StateCreator} from "zustand";

export interface SelectState {
    currentStep: number;
    goBackStep: () => void;
}
export const createSelectSlice: StateCreator<
    SelectState
> = (set) => ({
    currentStep: 0,
    goBackStep: () => set((prev) => ({ currentStep: prev.currentStep - 1 })),
})