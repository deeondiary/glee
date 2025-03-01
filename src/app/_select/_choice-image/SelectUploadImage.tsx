'use client'
import React from 'react';
import styles from './SelectUploadImage.module.css'
import ImageUpload from "@/src/components/image-upload/ImageUpload";
import {useBoundStore} from "@/src/store/stores";
import PlainButton from "@/src/components/button/PlainButton";

/* Step 03. 업로드 이미지 분석결과 확인
- currentStep : 3
 */
function SelectUploadImage() {
    const store = useBoundStore();
    const onClickButton = () => {
        store.goNextStep();
    }

    return (
        <div className={styles.container}>
            <div>
                <div className="title-2 weight-600 mg-top-30">
                    참고할 사진을 추가해주세요
                </div>
                <div className={styles['img-add--wrap']}>
                    <ImageUpload/>
                </div>
                <div className="mg-top-30">
                    {store.uploadedImageData.length > 0 &&
                        <>
                            <div className="body-1 weight-600">
                                사진을 첨부한 목적을 선택해주세요
                            </div>
                            <div className={styles['select-image__purpose--wrap']}>
                                <div
                                    className={`${styles['select-image__purpose']} ${store.imagePurpose === 'reply' && styles['select-image__purpose-active']}`}
                                    onClick={() => store.setImagePurpose('reply')}>
                                    이 사진에 대한<br/>답장이 필요해요
                                </div>
                                <div
                                    className={`${styles['select-image__purpose']} ${store.imagePurpose === 'nuance' && styles['select-image__purpose-active']}`}
                                    onClick={() => store.setImagePurpose('nuance')}>
                                    이런 느낌으로<br/>써주세요
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className="select-pages--button">
                <PlainButton disabled={store.imagePurpose === null} onClick={onClickButton}>
                    다음
                </PlainButton>
            </div>
        </div>
    )
        ;
}

export default SelectUploadImage;