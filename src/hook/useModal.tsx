import {ModalState, useUiStore} from "@/src/store/ui-store";
import {useRouter} from "next/navigation";
import {loginKaKao} from "@/src/api/auth";

interface UseModalProps {
    onConfirmAction?: () => void;
    onCancelAction?: () => void;
    type: string;
}
const useModalManage = (props: UseModalProps) => {
    const uiStore = useUiStore();

    const router = useRouter();
    const goLogin = () => {
        loginKaKao();
        uiStore.closeModal();
    }
    const goHome = () => {
        router.push("/");
        uiStore.closeModal();
    }

    const tokenExpiredModalState: ModalState = {
        title: '로그인이 만료되었어요',
        contents: '다시 로그인을 진행해주세요',
        onConfirm: goLogin,
        onConfirmText: '로그인',
        onCancelText: '취소',
        onCancel: uiStore.closeModal,
    }
    const deleteConfirmModalState: ModalState = {
        title: '정말 삭제하시겠어요?',
        contents: '이대로 삭제하면 글을 되돌릴 수 없어요.',
        onConfirm: props.onConfirmAction,
        onCancel: props.onCancelAction,
        onConfirmText: '삭제하기',
    }
    const serverErrorModalState: ModalState = {
        title: '네트워크가 불안정해요',
        contents: '잠시 후 다시 시도해주세요',
        onConfirm: goHome,
        onCancel: uiStore.closeModal,
        onConfirmText: '닫기',
        onCancelText: '취소',
    }

    const openModal = () => {
        if (props.type === 'token-expired') {
            uiStore.setModalState({...tokenExpiredModalState});
            // action();
        } else if (props.type === 'delete-confirm') {
            uiStore.setModalState({...deleteConfirmModalState});
        } else if (props.type === 'server-error') {
            uiStore.setModalState({...serverErrorModalState});
        }
        uiStore.openModal();
    }

    return ({
        openModal
    })
}

export default useModalManage;