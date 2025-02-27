import React, {ReactNode} from 'react';
import Modal from "@/src/components/modal/Modal";
import {useUiStore} from "@/src/store/ui-store";
import BottomDrawer from "@/src/components/bottom-drawer/BottomDrawer";

function LayoutWrapper(props: { children: ReactNode }) {
    const uiStore = useUiStore();
    return (
        <div>
            {props.children}
            {
                uiStore.modalShow &&
                <Modal title={uiStore.modalState.title} contents={uiStore.modalState.contents}
                       singleButton={uiStore.modalState.singleButton}
                       onConfirm={uiStore.modalState.onConfirm} onCancel={uiStore.modalState.onCancel} />
            }
        </div>
    );
}

export default LayoutWrapper;