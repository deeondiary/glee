'use client'
import React, {useEffect, useState} from 'react';
import styles from './ImageUpload.module.css'
import Image from "next/image";
import {useBoundStore} from "@/src/store/stores";
import {UploadedImageArray} from "@/src/type/select";
import {useUiStore} from "@/src/store/ui-store";

function ImageUpload() {
    // 업로드 된 이미지 화면에 표시
    const [uploadedSourceList, setUploadedSourceList] = useState<UploadedImageArray>([]);
    const store = useBoundStore();
    const uiStore = useUiStore();
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maxLength = 4;
        if (e.target.files) {
            if ((e.target.files.length + uploadedSourceList.length) > maxLength) {
                uiStore.openModal();
                uiStore.setModalState({
                    title: '업로드 한도 초과',
                    contents: '사진은 최대 4장 추가 가능합니다.',
                    singleButton: true,
                    onConfirm: uiStore.closeModal,
                    onCancel: uiStore.closeModal,
                })

            } else {
                const newArr: UploadedImageArray = [...uploadedSourceList];
                if (e.target.files.length > 1) {
                    // 사진 여러개 업로드
                    const fileArray = Array.from(e.target.files);
                    fileArray.forEach((file) => {
                        const newlyUploaded = { name: '', url: '', data: file };
                        newlyUploaded.name = file.name;
                        newlyUploaded.url = URL.createObjectURL(file);
                        newArr.push(newlyUploaded);
                    })
                    setUploadedSourceList(newArr);
                    store.setUploadedImageData(newArr);
                } else {
                    // 사진 1개 업로드
                    const [file] = e.target.files;
                    const url = URL.createObjectURL(file);
                    setUploadedSourceList([...uploadedSourceList, { name: file.name, url: url, data: file }]);
                    store.setUploadedImageData([...uploadedSourceList, { name: file.name, url: url, data: file }]);
                }
            }
        }

        e.target.value = '';
    }
    const deleteUploadedImage = (name: string) => {
        const index = uploadedSourceList.findIndex((item) => item.name === name);
        if (index > -1) {
            uploadedSourceList.splice(index, 1);
            setUploadedSourceList([...uploadedSourceList]);
            store.setUploadedImageData([...uploadedSourceList]);
        }
    }
    useEffect(() => {
        setUploadedSourceList([...store.uploadedImageData])
    }, [store.uploadedImageData]);

    return (
        <>
            <div className="body-1 weight-600">
                사진 추가&nbsp;
                <span className="body-2 weight-500 mg-top-20" style={{color: '#727479'}}>(최대 4장)</span>
            </div>
            <div className={styles['img-add__images']}>
                {uploadedSourceList.map((img, index) => {
                    return (
                        <div key={index}>
                            <Image src={img.url} width={75} height={75} className={styles['img-add__uploaded']} alt=''/>
                            <Image src="/icon/image_delete.png" width={15} height={15} className={styles['img-delete']} alt='' onClick={() => deleteUploadedImage(img.name)} />
                        </div>
                    )
                })}
                {uploadedSourceList.length < 4 &&
                    <>
                        <label htmlFor="image-upload" className={styles['img-add__button']}>
                            <Image
                                src="/icon/plus.png"
                                width={22}
                                height={22}
                                alt="plus-icon"
                                className="cp"
                            />
                        </label>
                        <input
                            id="image-upload"
                            type="file"
                            className={styles['img-add__original-button']}
                            accept={'image/*'}
                            multiple
                            onChange={(e) => onChangeHandler(e)}
                        /></>}
            </div>
        </>
    );
}

export default ImageUpload;