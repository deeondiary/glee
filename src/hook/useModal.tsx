import {ModalState, useUiStore} from "@/src/store/ui-store";
import {useRouter} from "next/navigation";

interface UseModalProps {
    onConfirmAction?: () => void;
    onCancelAction?: () => void;
    type: string;
}
const useModalManage = (props: UseModalProps) => {
    const uiStore = useUiStore();

    const router = useRouter();
    const goLogin = () => {
        router.push("/kakao");
        uiStore.closeModal();
    }
    const goHome = () => {
        router.push("/");
        uiStore.closeModal();
    }

    const tokenExpiredModalState: ModalState = {
        title: '세션이 만료되었습니다.',
        contents: '다시 로그인 해주세요.',
        onConfirm: goLogin,
        onConfirmText: '로그인 하러가기',
        onCancelText: '닫기',
        onCancel: uiStore.closeModal,
        buttonRatio: 'un-even'
    }
    const deleteConfirmModalState: ModalState = {
        title: '정말 삭제하시겠어요?',
        contents: '이대로 삭제하면 글을 되돌릴 수 없어요.',
        onConfirm: props.onConfirmAction,
        onCancel: props.onCancelAction,
        onConfirmText: '삭제하기',
    }
    const serverErrorModalState: ModalState = {
        title: '에러가 발생했어요',
        contents: '잠시 후 다시 시도하거나 관리자에게 문의해주세요.',
        onConfirm: goHome,
        onCancel: goHome,
        singleButton: true,
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