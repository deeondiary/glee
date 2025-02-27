/*
currentPage
- main 메인페이지 ('/')
- select 상황 선택 페이지 ('/select')
- template 템플릿 페이지
- login 로그인 페이지
 */
import {StateCreator} from "zustand";
import {UploadedImageArray} from "@/src/type/select";

/*
선택 상태 (currentStep)

00. 직접선택 or 사진첨부 (selectChoice) [SelectIfImage]
    - 직접선택 : 'select'
    - 사진첨부 : 'image'

01-1. 사진첨부 > 사진 업로드 [SelectUploadImage]
    - 사진 사용 목적 답장 'reply'
    - 사진 사용 목적 참고 'nuance'

02-1. 사진첨부 > 사진 분석결과 보기 [SelectUploadImageResult]

03-1. 사진첨부 > 추가 디테일 직접입력 [SelectWriteDetail]

04. 제안받기 (로딩)

05. AI 글 제안 3가지 보기

1-1. 직접선택일 경우
    - 1-1-1. 상황 선택
    - 1-1-2. 말투 선택
    - 1-1-3. 용도 선택

 */
export interface SelectState {
    isMainPage: boolean;
    setIsMainPage: (isMainPage: boolean) => void;
    selectChoice: string | null;
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
    resetAll: () => void;
}

export const createSelectSlice: StateCreator<
    SelectState
> = (set) => ({
    isMainPage: true,
    setIsMainPage: (arg: boolean) => set(() => ({isMainPage: arg})),
    selectChoice: 'image',
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
    resetAll: () => set(() => ({currentStep: 0, selectChoice: null, imagePurpose: null, isMainPage: true, uploadedImageData: []})),
})