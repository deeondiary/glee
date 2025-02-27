import React, {Ref, useState} from 'react';
import styles from './Textarea.module.css';

interface TextAreaProps {
    propsHeight?: string;
    propsPlaceholder?: string;
    propsFontSize?: string;
    inputRef?: Ref<HTMLTextAreaElement>;
    onChangeInput?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function Textarea({inputRef, onChangeInput, propsHeight = '60px', propsPlaceholder, propsFontSize = '13px'}: TextAreaProps) {
    const [length, setLength] = useState(0);
    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (onChangeInput) {
            onChangeInput(e);
        }
        setLength(e.target.value.length);
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <textarea className={styles['textarea']} style={{height: propsHeight, fontSize: propsFontSize}}
                          maxLength={30} placeholder={propsPlaceholder} ref={inputRef} onChange={onChangeHandler}/>
                <div className={styles['letter-count--wrapper']}>
                    <span className={styles['letter-count-current']}
                          style={{color: length === 30 ? '#FF1F00' : ''}}>{length}</span>
                    <span className={styles['letter-count-total']}>/30</span>
                </div>
            </div>
            <span className={styles['warning-text']}>최대 30자까지 입력가능해요</span>
        </div>
    );
}

export default Textarea;