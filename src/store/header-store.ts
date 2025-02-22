/*
currentPage
- main 메인페이지 ('/')
- select 상황 선택 페이지 ('/select')
- template 템플릿 페이지
- login 로그인 페이지
 */
import {StateCreator} from "zustand";

export interface HeaderState {
    currentPage: string;
    setCurrentPage: (state: string) => void;
}
export const createHeaderSlice: StateCreator<
    HeaderState
> = (set) => ({
    currentPage: 'main',
    setCurrentPage: (page: string) => set(() => ({ currentPage: page })),
})