import React, {ReactNode} from 'react';
import Modal from "@/src/components/modal/Modal";
import {useUiStore} from "@/src/store/ui-store";
import Header from "@/src/components/header/Header";

function LayoutWrapper(props: { children: ReactNode }) {
    const uiStore = useUiStore();

    return (
        <>
            <div style={{display: "flex", flexDirection: "column"}}>
                <Header />
                {props.children}
            </div>
            <div className="modal-all">
                {
                    uiStore.modalShow &&
                    <Modal title={uiStore.modalState.title} contents={uiStore.modalState.contents}
                           singleButton={uiStore.modalState.singleButton}
                           buttonRatio={uiStore.modalState.buttonRatio}
                           onCancelText={uiStore.modalState.onCancelText}
                           onConfirmText={uiStore.modalState.onConfirmText}
                           onConfirm={uiStore.modalState.onConfirm}
                           onCancel={uiStore.modalState.onCancel} />
                }
            </div>
        </>
    );
}

export default LayoutWrapper;