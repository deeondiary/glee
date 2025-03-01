'use client'
import React, {useEffect} from 'react';
import styles from './SelectUploadImageLoading.module.css'
import Image from "next/image";
import {postUploadImage} from "@/src/api/select";
import {useBoundStore} from "@/src/store/stores";

/* Step 02. 선택한 이미지 서버 업로드 & 응답 로딩
- currentStep : 2
 */
function SelectUploadImageLoading() {
    const store = useBoundStore();
    useEffect(() => {
        // 이미지 업로드 & ai 분석 요청
        postUploadImage(store.uploadedImageData, store.imagePurpose)
            .then((data) => {
                if (data) {
                    store.setImageAnalyzeResult(data);
                    store.goNextStep();
                } else {
                    // TODO 에러 처리
                }
            })
    }, []);
    return (
        <div className={styles.wrapper}>
            <div className={styles['text--wrap']}>
                <div className="gr-95 title-2 weight-600">사진을 분석하고 있어요...<br/>잠시만 기다려주세요</div>
            </div>
            <div className={styles['loading-gif--wrap']}>
                <Image src="/image/analysis_loading.gif" alt="loading.gif" width="290" height="73"  />
            </div>
        </div>
    );
}

export default SelectUploadImageLoading;