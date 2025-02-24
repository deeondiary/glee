'use client'
import React, {useState} from 'react';
import styles from './SelectUploadImage.module.css'
import ImageUpload from "@/src/components/image-upload/ImageUpload";
import {useBoundStore} from "@/src/store/stores";

function SelectUploadImage() {
    const store = useBoundStore();
    const [isUploaded, setIsUploaded] = useState(false);

    return (
        <div className={styles['select-image--container']}>
            <div className="title-2 weight-600">
                참고할 사진을 추가해주세요
            </div>
            <div className={styles['img-add__images--wrap']}>
                <ImageUpload setIsUploaded={setIsUploaded} />
            </div>
            {isUploaded &&
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
                </>}
        </div>
    );
}

export default SelectUploadImage;