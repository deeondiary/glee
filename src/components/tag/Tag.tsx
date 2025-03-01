import React from 'react';
import styles from './Tag.module.css'

interface TagProps {
    type: 'round-select' | 'round-sort' | 'squared';
    text: string;
    selected?: Array<string>;
    marginRight?: string;
}

function Tag(props: TagProps) {
    const textToColor = () => {
        let value = ''
        switch (props.text) {
            case '안부':
                value =  '1'; break;
            case '위로':
                value = '2'; break;
            case '축하':
                value = '3'; break;
            case '사과':
                value = '4'; break;
            case '감사':
                value = '5'; break;
            case '회사':
                value = '6'; break;
            case '학교':
                value = '7'; break;
            case '참고':
                value = '8'; break;
            case '즐겨찾기':
                value = '9'; break;
            case '아이디어':
                value = '10'; break;
        }
        return value;
    }
    return (
        <div style={{marginRight: props.marginRight ? props.marginRight : '' }}>
            {props.type === 'squared' ?
                <span className={`${styles['squared--wrap']} ${styles['squared-color-' + textToColor()]}`}>{props.text}</span> :
                <span className={`${styles[props.type + '--wrap']} ${props.selected && props.selected?.includes(props.text) ? styles[props.type + '--selected'] : ''}`}>
                    {props.text}
                </span>
            }
        </div>
    );
}

export default Tag;