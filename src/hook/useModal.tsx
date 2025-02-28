import {ModalState, useUiStore} from "@/src/store/ui-store";

interface UseModalProps {
    onConfirmAction?: () => void;
    onCancelAction?: () => void;
    type: string;
}
const useModalManage = (props: UseModalProps) => {
    const uiStore = useUiStore();

    const tokenExpiredModalState: ModalState = {
        title: '세션이 만료되었습니다.',
        contents: '다시 로그인 해주세요.',
        onConfirm: () => {},
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

    const openModal = () => {
        if (props.type === '400') {
            uiStore.setModalState({...tokenExpiredModalState});
            // action();
        } else if (props.type === 'delete-confirm') {
            uiStore.setModalState({...deleteConfirmModalState});
        }
        uiStore.openModal();
    }

    return ({
        openModal
    })
}

export default useModalManage;