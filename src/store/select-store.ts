import {StateCreator} from "zustand";
import {UploadedImageArray} from "@/src/type/select";
import {TemplateGenerateParam} from "@/src/type/template";

/*
선택 상태 (currentStep)

00. 직접선택 or 사진첨부 (selectChoice) [SelectIfImage]
    - 직접선택 : 'option'
    - 사진첨부 : 'image'

01-1. 사진첨부 > 사진 업로드 [SelectUploadImage]
    - 사진 사용 목적 답장 'reply'
    - 사진 사용 목적 참고 'nuance'

02-1. 사진 업로드 응답 대기 [SelectUploadImageResultLoading]

03-1. 사진첨부 > 사진 분석결과 보기 [SelectUploadImageResult]

04-1. 사진첨부 > 추가 디테일 직접입력 [SelectWriteDetail]

05. 제안받기 (로딩)

06. AI 글 제안 3가지 보기

1-1. 직접선택일 경우
    - 1-1-1. 상황 선택 (situation)
    - 1-1-2. 말투 선택 (tone)
    - 1-1-3. 용도 선택 (usage)
    - 1-1-4. 추가 디테일 직접입력 (detail)
 */
export interface SelectState {
    isMainPage: boolean;
    setIsMainPage: (isMainPage: boolean) => void;
    selectChoice: string;
    setSelectChoice: (choice: string) => void;
    uploadedImageData: UploadedImageArray | [];
    setUploadedImageData: (imageData: UploadedImageArray) => void;
    imageFormData: FormData | null;
    setImageFormData: (imageFormData: FormData) => void;
    imagePurpose: string | null;
    setImagePurpose: (imagePurpose: string) => void;
    currentStep: number;
    goNextStep: () => void;
    goBackStep: () => void;
    setCurrentStep: (step: number) => void;
    resetSelectProcess: () => void;
    otherSuggestionsReqCount: number;
    setOtherSuggestionsReqCount: (otherSuggestionsReqCount: number) => void;
    optionsSelectSteps: number;
    setOptionsSelectSteps: (options: number) => void;
    selectedOptionsSet: TemplateGenerateParam;
    setSelectedOptions: (options: TemplateGenerateParam) => void;
}

export const createSelectSlice: StateCreator<
    SelectState
> = (set) => ({
    isMainPage: true,
    setIsMainPage: (arg: boolean) => set(() => ({isMainPage: arg})),
    selectChoice: '',
    setSelectChoice: (arg: string) => set(() => ({selectChoice: arg})),
    uploadedImageData: [],
    setUploadedImageData: (arg: UploadedImageArray) => set(() => ({uploadedImageData: arg})),
    imageFormData: null,
    setImageFormData: (arg: FormData | null) => set(() => ({imageFormData: arg})),
    imagePurpose: null,
    setImagePurpose: (arg: string) => set(() => ({imagePurpose: arg})),
    currentStep: 0,
    goNextStep: () => set((prev) => ({currentStep: prev.currentStep + 1})),
    goBackStep: () => set((prev) => ({currentStep: prev.currentStep - 1})),
    setCurrentStep: (step: number) => set(() => ({currentStep: step})),
    resetSelectProcess: () => set(() => (
        {
            currentStep: 0,
            selectChoice: '',
            imagePurpose: null,
            imageFormData: null,
            isMainPage: true,
            uploadedImageData: [],
            selectedOptionsSet: {} as TemplateGenerateParam,
            optionsSelectSteps: 0,
            otherSuggestionsReqCount: 0,
        })),
    otherSuggestionsReqCount: 0,
    setOtherSuggestionsReqCount: (arg: number) => set(() => ({otherSuggestionsReqCount: arg})),
    optionsSelectSteps: 0,
    setOptionsSelectSteps: (options: number) => set(() => ({optionsSelectSteps: options})),
    selectedOptionsSet: {} as TemplateGenerateParam,
    setSelectedOptions: (arg: TemplateGenerateParam) => set(() => ({selectedOptionsSet: arg as TemplateGenerateParam})),
})