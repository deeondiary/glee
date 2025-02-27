'use client'
import React from 'react';
import styles from './SelectUploadImageResult.module.css'
import {useBoundStore} from "@/src/store/stores";
import PlainButton from "@/src/components/button/PlainButton";
import Image from "next/image";

/* Step 02 - 1. 업로드한 사진 분석 결과
- currentStep : 2
 */
function SelectUploadImageResult() {
    const store = useBoundStore();
    const onClickButton = () => {
        store.goNextStep();
    }
    return (
        <div className="select-pages--container">
            <div>
                <div className="title-2 weight-600 mg-top-14">
                    사진을 토대로<br/>AI가 사진을 분석했어요
                </div>
                <div className="body-2 weight-600 mg-top-14 mg-bottom-40"
                     style={{color: '#5B5B5C'}}>
                    분석한 상황에 맞게 글을 제안해드릴게요
                </div>
                <div className={styles['select-image__result-chips--wrap']}>
                    <div className={styles['select-image-result--chips']}>
                        <div className={styles['result-title--wrap']}>
                            <Image src='/icon/situation_og.png' alt='icon' width={16} height={16} className="mg-right-7"/>
                            상황
                        </div>
                        <div className='scrollbar'>
                            {store.imageAnalyzeResult && store.imageAnalyzeResult.situation}
                        </div>
                    </div>
                    {
                        store.imagePurpose === 'nuance' &&
                        <>
                            <div className={styles['select-image-result--chips']}>
                                <div className={styles['result-title--wrap']}>
                                    <Image src='/icon/tone_og.png' alt='icon' width={16} height={16} className="mg-right-7"/>
                                    말투
                                </div>
                                <div className='scrollbar'>
                                    {store.imageAnalyzeResult && store.imageAnalyzeResult.tone}
                                </div>
                            </div>
                            <div className={styles['select-image-result--chips']}>
                                <div className={styles['result-title--wrap']}>
                                    <Image src='/icon/purpose_og.png' alt='icon' width={16} height={16} className="mg-right-7"/>
                                    용도
                                </div>
                                <div className='scrollbar'>
                                    {store.imageAnalyzeResult && store.imageAnalyzeResult.usage}
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className="select-pages--button">
                <PlainButton onClick={onClickButton}>
                    다음
                </PlainButton>
            </div>
        </div>
    );
}

export default SelectUploadImageResult;