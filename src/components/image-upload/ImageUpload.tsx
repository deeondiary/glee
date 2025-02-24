'use client'
import React, {useState} from 'react';
import styles from './ImageUpload.module.css'
import Image from "next/image";
import Modal from "@/src/components/modal/Modal";

interface UploadedImage {
   name: string;
   url: string;
}
function ImageUpload(props: { setIsUploaded: (arg0: boolean) => void; }) {
    // 업로드 된 이미지 화면에 표시
    type UploadedImageArray = Array<UploadedImage>;
    const [uploadedSourceList, setUploadedSourceList] = useState<UploadedImageArray>([]);
    const [modalShow, setModalShow] = useState(false);
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maxLength = 4;
        if (e.target.files) {
            if ((e.target.files.length + uploadedSourceList.length) > maxLength) {
                setModalShow(true);
            } else {
                const newArr: UploadedImageArray = [...uploadedSourceList];
                props.setIsUploaded(true);
                if (e.target.files.length > 1) {
                    // 사진 여러개 업로드

                    const fileArray = Array.from(e.target.files);
                    fileArray.forEach((file) => {
                        const newlyUploaded = { name: '', url: '' };
                        newlyUploaded.name = file.name;
                        newlyUploaded.url = URL.createObjectURL(file);
                        newArr.push(newlyUploaded);
                    })
                    setUploadedSourceList(newArr);
                } else {
                    // 사진 1개 업로드
                    const [file] = e.target.files;
                    const url = URL.createObjectURL(file);
                    setUploadedSourceList([...uploadedSourceList, { name: file.name, url: url }]);
                }
            }
        }

        e.target.value = '';
    }
    return (
        <div>
            <div className="body-1 weight-600">
                사진 추가&nbsp;
                <span className="body-2 weight-500 mg-top-20" style={{color: '#727479'}}>(최대 4장)</span>
            </div>
            <div className={styles['img-add__images']}>
                {uploadedSourceList.map((img, index) => {
                    return (
                        <div key={index}>
                            <Image src={img.url} width={75} height={75} className={styles['img-add__uploaded']} alt=''/>
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
            {modalShow &&
                <Modal
                    title="업로드 한도 초과" contents="사진은 최대 4장 추가 가능합니다."
                    onConfirm={() => setModalShow(false)} singleButton={true}
                />}
        </div>
    );
}

export default ImageUpload;