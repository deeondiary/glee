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
    onCancel?: () => void;
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
}
// export const createUiSlice: StateCreator<
//     UiState
// > = (set) => ({
//     modalShow: false,
//     setModalShow: (state: boolean) => set(() => ({ modalShow: state })),
//     modalTitle: '',
//     setModalTitle: (state: string) => set(() => ({ modalTitle: state })),
//     modalContents: '',
//     setModalContents: (state: string) => set(() => ({ modalContents: state })),
//     onCancelModal: () => set(() => ({ modalShow: false })),
//     onConfirmModal: () => set(() => ({ modalShow: false })),
//
//     toastShow: false,
//     setToastShow: (state: boolean) => set(() => ({ toastShow: state })),
//     toastText: '',
//     setToastText: (state: string) => set(() => ({ toastText: state })),
// })

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
    }))