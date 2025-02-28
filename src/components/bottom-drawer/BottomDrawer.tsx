import React from 'react';
import styles from './BottomDrawer.module.css'
import PlainButton from "@/src/components/button/PlainButton";

interface BottomDrawerProps {
    children: React.ReactNode;
    title: string;
    onClose: () => void;
    onCloseAction?: () => void;
}
function BottomDrawer(props: BottomDrawerProps) {
    const onClickButton = () => {
        props.onClose()
        if (props.onCloseAction) {
            props.onCloseAction();
        }
    }
    return (
        <div className={styles['wrapper']}>
            <div className={styles['container']}>
                <div className="center">
                    <div className={styles['bar']}></div>
                </div>
                <div className="gr-90 body-1 weight-600">
                    {props.title}
                </div>
                <div className={styles['children--wrapper']}>
                    {props.children}
                </div>
                <div className="mg-bottom-12">
                    <PlainButton onClick={onClickButton}>확인</PlainButton>
                </div>
            </div>
        </div>
    );
}

export default BottomDrawer;