import React from 'react';
import styles from './Toast.module.css'

interface ToastProps {
    children: string;
}
function Toast(props: ToastProps) {
    return (
        <div className={styles.toast}>
            {props.children}
        </div>
    );
}

export default Toast;