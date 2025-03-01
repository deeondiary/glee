import React, {Ref} from 'react';
import styles from './Textarea.module.css';

interface PlainTextareaProps {
    inputRef?: Ref<HTMLTextAreaElement>;
    onChangeInput?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    bdColor?: string;
    height?: string;
    disabled?: boolean;
    fontColor?: string;
    template?: boolean;
}
function PlainTextarea(props: PlainTextareaProps) {

    return (
        <div className={props.template ? styles['container-template'] : styles.container}
             style={{
                 padding: props.template ? 0 : '',
                 height: props.height ? props.height : '',
                 borderColor: props.bdColor ? props.bdColor : '#FFF1DF',
             }}>
                <textarea id="text-area" className={props.template ? styles['textarea-template'] : styles.textarea}
                          style={{ color: props.fontColor ? props.fontColor : '' }} autoFocus={true}
                          disabled={props.disabled} placeholder={props.placeholder} ref={props.inputRef} onChange={props.onChangeInput}/>
        </div>
    );
}

export default PlainTextarea;