/*
currentPage
- main 메인페이지 ('/')
- select 상황 선택 페이지 ('/select')
- template 템플릿 페이지
- login 로그인 페이지
 */
import {StateCreator} from "zustand";
import {UploadedImageArray} from "@/src/components/image-upload/ImageUpload";

/*
선택 상태 (currentStep)
0. 직접선택 or 사진첨부 (selectChoice)
    - 직접선택 : 'select'
    - 사진첨부 : 'image'
1-1. 직접선택일 경우
1-2. 사진첨부일 경우
    - 사진 사용 목적 답장 'reply'
    - 사진 사용 목적 참고 'nuance'
2. 글 제안
 */
export interface SelectState {
    isMainPage: boolean;
    setIsMainPage: (isMainPage: boolean) => void;
    modalShow: boolean;
    setModalShow: (modalShow: boolean) => void;
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
    setIsMainPage: (value: boolean) => set(() => ({isMainPage: value})),
    modalShow: false,
    setModalShow: (modalShow: boolean) => set(() => ({modalShow: modalShow})),
    selectChoice: 'image',
    setSelectChoice: (value: string) => set(() => ({selectChoice: value})),
    uploadedImageData: [],
    setUploadedImageData: (value: UploadedImageArray) => set(() => ({uploadedImageData: value})),
    imageFormData: null,
    setImageFormData: (value: FormData | null) => set(() => ({imageFormData: value})),
    imagePurpose: null,
    setImagePurpose: (value: string) => set(() => ({imagePurpose: value})),
    currentStep: 0,
    goNextStep: () => set((prev) => ({currentStep: prev.currentStep + 1})),
    goBackStep: () => set((prev) => ({currentStep: prev.currentStep - 1})),
    resetAll: () => set(() => ({currentStep: 0, selectChoice: null, imagePurpose: null, isMainPage: true, uploadedImageData: []})),
})