import React, {Ref} from 'react';
import styles from './Textarea.module.css';

interface PlainTextareaProps {
    inputRef?: Ref<HTMLTextAreaElement>;
    onChangeInput?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    bdColor?: string;
    height?: string;
    transparent?: boolean;
    disabled?: boolean;
}
function PlainTextarea(props: PlainTextareaProps) {

    return (
        <div className={props.transparent ? styles['container-transparent'] : styles.container}
             style={{
                 padding: props.transparent ? 0 : '',
                 height: props.height ? props.height : '',
                 borderColor: props.bdColor ? props.bdColor : '#FFF1DF',
             }}>
                <textarea className={props.transparent ? styles['textarea-transparent'] : styles.textarea}
                          disabled={props.disabled} placeholder={props.placeholder} ref={props.inputRef} onChange={props.onChangeInput}/>
        </div>
    );
}

export default PlainTextarea;