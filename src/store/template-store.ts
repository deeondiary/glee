/*
currentPage
- main 메인페이지 ('/')
- select 상황 선택 페이지 ('/select')
- template 템플릿 페이지
- login 로그인 페이지
 */
import {StateCreator} from "zustand";
import {ImageAnalyzeResult, SuggestedResponses, SuggestedResponsesArray} from "@/src/type/select";
import {TemplateSearchHistory} from "@/src/type/template";

export interface TemplateState {
    imageAnalyzeResult: ImageAnalyzeResult | null; // 참고이미지 분석 결과
    setImageAnalyzeResult: (value: ImageAnalyzeResult) => void;
    suggestedTemplates: SuggestedResponsesArray; // 제안받은 템플릿 후보 (3개)
    setSuggestedTemplates: (value: SuggestedResponsesArray) => void;
    selectedTemplate: SuggestedResponses; // 저장하기로 선택한 템플릿 1개
    setSelectedTemplate: (value: SuggestedResponses) => void;
    resetTemplateData: () => void;

    recentSearchList: Array<TemplateSearchHistory>;
    setRecentSearchList: (value: Array<TemplateSearchHistory>) => void;
}

export const createTemplateSlice: StateCreator<
    TemplateState
> = (set) => ({
    imageAnalyzeResult: null,
    setImageAnalyzeResult: (value: ImageAnalyzeResult) => set(() => ({imageAnalyzeResult: value})),
    suggestedTemplates: [] as SuggestedResponsesArray,
    setSuggestedTemplates: (value: SuggestedResponsesArray) => set(() => ({suggestedTemplates: value})),
    selectedTemplate: {} as SuggestedResponses,
    setSelectedTemplate: (value: SuggestedResponses) => set(() => ({selectedTemplate: value})),
    resetTemplateData: () => set(() => ({
        imageAnalyzeResult: null,
        suggestedTemplates: [],
        selectedTemplate: {} as SuggestedResponses,
    })),

    recentSearchList: [],
    setRecentSearchList: (value: Array<TemplateSearchHistory>) => set(() => ({recentSearchList: value})),
})