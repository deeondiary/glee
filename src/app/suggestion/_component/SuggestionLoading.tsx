'use client'
import React from 'react';
import styles from './SuggestionLoading.module.css'
import Image from "next/image";

/* Step 02. 선택한 이미지 서버 업로드 & 응답 로딩
- currentStep : 2
 */
type SuggestionLoadingProps = { type: 'analysis' | 'image' };
function SuggestionLoading(props: SuggestionLoadingProps) {
    return (
        <div className={styles.wrapper}>
            <div className={styles['text--wrap']}>
                <span className="gr-95 title-2 weight-600">
                    {props.type === 'image' && `사진을 분석하고 있어요...\n잠시만 기다려주세요` }
                    {props.type === 'analysis' && `글이 작성되고 있어요...\n딱 맞는 글을 제안드릴게요` }
                </span>
            </div>
            <div className={styles['loading-gif--wrap']}>
                <Image src={`/image/${props.type}_loading.gif`}
                       style={{marginTop: props.type === 'image' ? '150px' : '45px'}}
                       alt="loading.gif" width="290" height={props.type === 'image' ? 73 : 290}  />
            </div>
        </div>
    );
}

export default SuggestionLoading;