import React from 'react';
import styles from './Modal.module.css'
import PlainButton from "@/src/components/button/PlainButton";
import {goMainPage} from "@/src/util/router";
import {useRouter} from "next/navigation";
import {useBoundStore} from "@/src/store/stores";

interface ModalProps {
    title: string;
    contents: string;
    onCancel: () => void;
    singleButton?: boolean;
    onConfirm?: string;
}
function Modal(props: ModalProps) {
    const router = useRouter();
    const store = useBoundStore();
    const onClickConfirm = () => {
        if (props.onConfirm === 'go-main-page') {
            goMainPage(router);
            store.setIsMainPage(true);
            store.resetAll();
            props.onCancel();
        } else {
            props.onCancel();
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.contents}>
                    <div className="subtitle-2 weight-700">{props.title}</div>
                    <div className={`${styles['contents-txt']} body-2`}>{props.contents}</div>
                </div>
                <div className={styles['btn-wrap']}>
                    { props.singleButton !== true &&
                    <PlainButton onClick={props.onCancel} height={46} bgColor="#E6E6E6" color="#0C0C0D">취소</PlainButton> }
                    <PlainButton onClick={onClickConfirm} height={46}>닫기</PlainButton>
                </div>
            </div>
        </div>
    );
}

export default Modal;