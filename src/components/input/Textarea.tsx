import React, {useRef, useState} from 'react';
import styles from './Textarea.module.css';

interface TextAreaProps {
    propsHeight?: string;
    propsPlaceholder?: string;
    propsFontSize?: string;
    setValue?: (value: string) => void;
}

function Textarea({setValue, propsHeight = '60px', propsPlaceholder, propsFontSize = '13px'}: TextAreaProps) {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [length, setLength] = useState(0);
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (inputRef.current) {
            inputRef.current.value = e.target.value;
            setLength(inputRef.current.value.length);
            setValue(inputRef.current.value);
        }
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <textarea className={styles['textarea']} style={{height: propsHeight, fontSize: propsFontSize}}
                          maxLength={30} placeholder={propsPlaceholder} ref={inputRef} onChange={onChange}/>
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