import React from 'react';
import styles from './Textarea.module.css';

interface PlainTextareaProps {
    value: string;
    setValue: (value: string) => void;
    placeholder?: string;
    bdColor?: string;
    height?: string;
    disabled?: boolean;
    fontColor?: string;
    backColor?: string;
}
function Textarea(props: PlainTextareaProps) {
    const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.setValue(e.target.value);
    }

    return (
        <textarea id="text-area" className={styles.textarea}
                  value={props.value}
                  style={{ color: props.fontColor ? props.fontColor : '',
                      height: props.height ? props.height : '',
                      borderColor: props.bdColor ? props.bdColor : '#FFF1DF',
                      backgroundColor: props.backColor ? props.backColor : '' }}
                  disabled={props.disabled} placeholder={props.placeholder} onChange={onChangeInput}/>
    );
}

export default Textarea;