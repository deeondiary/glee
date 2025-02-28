import React, {ReactNode, useEffect} from 'react';
import Modal from "@/src/components/modal/Modal";
import {useUiStore} from "@/src/store/ui-store";
import Header from "@/src/components/header/Header";
import Toast from "@/src/components/toast/Toast";
import BottomDrawer from "@/src/components/bottom-drawer/BottomDrawer";
import TagsEdit from "@/src/app/template/_components/TagsEdit";
import useTagManage from "@/src/hook/useTag";

export interface LayoutProps {
    children: ReactNode;
    tags?: Array<string>;
    setTags?: (tags: Array<string>) => void;
    onCloseTagDrawer?: () => void;
}
function LayoutWrapper(props: LayoutProps) {
    const uiStore = useUiStore();
    const useTag = useTagManage({tags: props.tags ? props.tags : [''], setTags: props?.setTags ? props.setTags : ()=>{}});
    useEffect(() => {
        if (uiStore.toastShow) {
            setTimeout(() => {
                uiStore.setToastShow(false);
            }, 1000)
        }
    }, [uiStore.toastShow]);

    return (
        <>
            <div style={{display: "flex", flexDirection: "column"}}>
                <Header />
                {props.children}
            </div>
            <div>
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
            <div className="toast--wrapper">
                {
                    uiStore.toastShow &&
                    <Toast>{uiStore.toastText}</Toast>
                }
            </div>
            {
                uiStore.tagEditShow &&
                <BottomDrawer title='태그 편집' onClose={useTag.onCloseTagEdit} onCloseAction={props.onCloseTagDrawer}>
                    <TagsEdit align="flex-start" selectedTags={props.tags? props.tags : []} setSelectedTags={props.setTags ? props.setTags : ()=>{}}/>
                </BottomDrawer>
            }
        </>
    );
}

export default LayoutWrapper;