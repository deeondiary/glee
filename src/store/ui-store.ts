/*
UI 상태관리 : 모달, 토스트
 */
import {create} from "zustand";

interface ModalState {
    title: string;
    contents: string;
    singleButton?: boolean;
    onClickConfirm?: string;
    onConfirm?: string;
    onCancel: () => void;
}
export interface UiState {
    modalShow: boolean;
    openModal: () => void;
    closeModal: () => void;
    modalState: ModalState;
    setModalState: (state: ModalState) => void;
    toastShow: boolean;
    setToastShow: (arg: boolean) => void;
    toastText: string;
    setToastText: (arg: string) => void;
    descriptionShow: boolean;
    setDescriptionShow: (show: boolean) => void;
}

export const useUiStore = create<UiState>()((set) =>
    ({
        modalState: {} as ModalState,
        setModalState: (state: ModalState) => set(() => ({ modalState: state })),
        modalShow: false,
        openModal: () => set(() => ({ modalShow: true })),
        closeModal: () => set(() => ({ modalShow: false })),

        toastShow: false,
        setToastShow: (state) => set(() => ({ toastShow: state })),
        toastText: '',
        setToastText: (state) => set(() => ({ toastText: state })),

        descriptionShow: false,
        setDescriptionShow: (state) => set(() => ({ descriptionShow: state })),
    }))