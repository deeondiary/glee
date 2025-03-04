import React from 'react';
import styles from './TextInput.module.css';

interface InputProps {
    value?: string;
    setValue: (value: string) => void;
    placeholder?: string;
    color?: string;
    max?: number;
    disabled?: boolean;
    bdColor?: string;
    backColor?: string;
}

function TextInput(props: InputProps) {
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setValue(e.target.value);
    }
    return (
        <input style={{
            color: props.color ? props.color : '',
            backgroundColor: props.backColor ? props.backColor : '',
            borderColor: props.bdColor ? props.bdColor : '',}}
               maxLength={props.max}
               value={props.value} className={styles.input} onChange={onChangeInput} disabled={props.disabled}
               placeholder={props.placeholder}/>
    );
}

export default TextInput;