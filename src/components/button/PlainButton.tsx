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
    width?: string;
    borderRound?: boolean;
}

function PlainButton(props: ButtonProps) {
    return (
        <button className={styles.button}
                style={{
                    width: props.width ? props.width : '',
                    backgroundColor: props.bgColor ? props.bgColor : '',
                    color: props.color ? props.color : 'white',
                    height: props.height ? props.height : '',
                    border: props.bgColor === 'white' ? '1px solid #727479' : '',
                    borderRadius: props.borderRound ? '100px' : '',
                }}
                onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </button>
    );
}

export default PlainButton;