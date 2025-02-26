/*
currentPage
- main 메인페이지 ('/')
- select 상황 선택 페이지 ('/select')
- template 템플릿 페이지
- login 로그인 페이지
 */
import {StateCreator} from "zustand";
import {ImageAnalyzeResult} from "@/src/type/ai";

export interface AiState {
    imageAnalyzeResult: ImageAnalyzeResult | null; // 참고이미지 분석 결과
    setImageAnalyzeResult: (value: ImageAnalyzeResult) => void;
    suggestedTemplates: string[]; // 제안받은 템플릿 후보 (3개)
    setSuggestedTemplates: (value: string[]) => void;
    selectedTemplate: string; // 저장하기로 선택한 템플릿 1개
    setSelectedTemplate: (value: string) => void;
}
export const createAiSlice: StateCreator<
    AiState
> = (set) => ({
    imageAnalyzeResult: null,
    setImageAnalyzeResult: (value: ImageAnalyzeResult) => set(() => ({ imageAnalyzeResult: value })),
    suggestedTemplates: [''],
    setSuggestedTemplates: (value: string[]) => set(() => ({ suggestedTemplates: value })),
    selectedTemplate: '',
    setSelectedTemplate: (value: string) => set(() => ({ selectedTemplate: value })),
})