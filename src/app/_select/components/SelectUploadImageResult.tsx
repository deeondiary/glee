'use client'
import React from 'react';
import styles from './SelectUploadImageResult.module.css'
import {useBoundStore} from "@/src/store/stores";

function SelectUploadImageResult() {
    const store = useBoundStore();
    return (
        <div className={styles['select-image__result--container']}>
            <div className="title-2 weight-600">
                사진을 토대로<br/>AI가 사진을 분석했어요
            </div>
            <div className="body-2 weight-600 mg-top-14 mg-bottom-40"
                 style={{color: '#5B5B5C'}}>
                분석한 상황에 맞게 글을 제안해드릴게요
            </div>
            <div className={styles['select-image__result-chips--wrap']}>
                <div className={styles['select-image-result--chips']}>
                    <div className="body-3 weight-700" style={{color: '#FF6200'}}>상황</div>
                    <div>상황 설명 내용 내용 내용</div>
                </div>
                <div className={styles['select-image-result--chips']}>
                    <div className="body-3 weight-700" style={{color: '#FF6200'}}>말투</div>
                    <div>상황 설명 내용 내용 내용 상황 설명 내용 내용 내용 상황 설명 내용 내용 내용상황 설명 내용 내용 내용상황 설명 내용 내용 내용</div>
                </div>
                <div className={styles['select-image-result--chips']}>
                    <div className="body-3 weight-700" style={{color: '#FF6200'}}>용도</div>
                    <div>상황 설명 내용 내용 내용</div>
                </div>
            </div>
        </div>
    );
}

export default SelectUploadImageResult;