import React from 'react';
import styles from './Modal.module.css'
import PlainButton from "@/src/components/button/PlainButton";
import {ModalState} from "@/src/store/ui-store";

function Modal(props: ModalState) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.contents}>
                    <div className="subtitle-2 weight-700">{props.title}</div>
                    <div className={`${styles['contents-txt']} body-2`}>{props.contents}</div>
                </div>
                <div className={styles['btn-wrap']}>
                    { props.singleButton !== true &&
                    <PlainButton
                        width={props.buttonRatio === 'un-even' ? '40%' : ''}
                        onClick={props.onCancel} height={46} bgColor="#E6E6E6" color="#0C0C0D">
                        {props.onCancelText ? props.onCancelText : '취소'}
                    </PlainButton> }
                    <PlainButton onClick={props.onConfirm} height={46}>
                        {props.onConfirmText ? props.onConfirmText : '닫기'}
                    </PlainButton>
                </div>
            </div>
        </div>
    );
}

export default Modal;