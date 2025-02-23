import React from 'react';
import styles from './PlainButton.module.css'

interface ButtonProps {
    children: string | React.ReactNode;
    aboveText?: string;
    disabled?: boolean;
    onClick?: () => void;
    height?: number;
    bgColor?: string;
    color?: string;
}
function PlainButton(props: ButtonProps) {
    return (
        <button className={styles.button}
                style={{ backgroundColor: props.bgColor ? props.bgColor : '', color: props.color ? props.color : 'white', height: props.height ? props.height : '' }}
                onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </button>
        // <div className={styles['button-area']}>
        //     <div className={styles['text-above']}>
        //         {props.aboveText}
        //     </div>
        //     <button className={styles.button} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>
        // </div>
    );
}
export default PlainButton;