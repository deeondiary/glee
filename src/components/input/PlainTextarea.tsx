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
    fontColor?: string;
}
function PlainTextarea(props: PlainTextareaProps) {

    return (
        <div className={props.transparent ? styles['container-transparent'] : styles.container}
             style={{
                 padding: props.transparent ? 0 : '',
                 height: props.height ? props.height : '',
                 borderColor: props.bdColor ? props.bdColor : '#FFF1DF',
             }}>
                <textarea id="text-area" className={props.transparent ? styles['textarea-transparent'] : styles.textarea}
                          style={{ color: props.fontColor ? props.fontColor : '' }} autoFocus={true}
                          disabled={props.disabled} placeholder={props.placeholder} ref={props.inputRef} onChange={props.onChangeInput}/>
        </div>
    );
}

export default PlainTextarea;