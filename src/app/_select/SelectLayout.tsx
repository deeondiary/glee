import React from 'react';
import styles from './select.module.css'
import Image from "next/image";
import PlainButton from "@/src/components/button/PlainButton";
import Modal from "@/src/components/modal/Modal";
import SelectIfImage from "@/src/app/_select/components/SelectIfImage";
import {useBoundStore} from "@/src/store/stores";
import SelectUploadImage from "@/src/app/_select/components/SelectUploadImage";
import SelectUploadImageResult from "@/src/app/_select/components/SelectUploadImageResult";
// import {postUploadImage} from "@/src/api/image";

function SelectLayout() {
    const store = useBoundStore();
    const onCancelModal = () => {
        store.setModalShow(false);
    }
    const onConfirmModal = () => {
        store.setModalShow(false);
        store.setIsMainPage(true);
        store.resetAll()
    }
    const onClickNextHandler = () => {
        if (store.currentStep === 1 && store.selectChoice === 'image') {
            // console.log(store.uploadedImageData)
            // // const formData = new FormData();
            // const newArr = []
            // store.uploadedImageData.forEach(image => {
            //     const formData = new FormData();
            //     // formData.append('image', image.data);
            //     // console.log(image, 'image');
            //     // newArr.push(formData);
            //     // const dd = new Blob([JSON.stringify(image.data)], {
            //     //     type: "multipart/form-data",
            //     // })
            //     console.log('image ::', image.data)
            //     formData.append('file', image.data)
            //     newArr.push(formData)
            // })

            // for (const value of store.imageFormData.values()) {
            //     console.log('ddjdjdjd')
            //     console.log(value);
            // }
            // console.log(store.imageFormData, 'djdjdjdjd121212')
            // postUploadImage(newArr);
            store.goNextStep();
        } else {
            store.goNextStep();
        }
    }
    const onClickSuggestButton = () => {
        store.setIsMainPage(false);
    }
    return (
        <div>
            {!store.isMainPage ?
                <div className={styles['page-container']}>
                    <div className="scrollbar" style={{ paddingTop: '54px' }}>
                        {store.currentStep === 0 &&
                            <SelectIfImage/>}
                        {(store.currentStep === 1 && store.selectChoice === 'image') &&
                            <SelectUploadImage/>}
                        {(store.currentStep === 2) &&
                            <SelectUploadImageResult/>}
                    </div>
                    <div className={styles['bottom-button--wrap']}>
                        <PlainButton disabled={store.currentStep === 0 && store.selectChoice === null}
                                     onClick={onClickNextHandler}>
                            다음
                        </PlainButton>
                    </div>
                </div> :
                /**/
                <div className={styles['btn-state__wrap']}
                     onClick={onClickSuggestButton}>
                    <Image
                        src="/icon/arrow_top.png"
                        width={15}
                        height={15}
                        alt="arrow-icon"
                        className="cp"
                    />
                    <div className={styles['btn-state__text__wrap']}>
                        <div style={{height: '18px', width: '18px', backgroundColor: 'white'}}>
                        </div>
                        <div className="body-1 weight-600">글 제안받기</div>
                    </div>
                </div>
            }
            {
                store.modalShow &&
                <Modal
                    title="글 제안받기를 중단하시겠어요?" contents={"지금 중단하면 되돌릴 수 없어요.\n그래도 중단하시겠어요?"}
                    onCancel={onCancelModal} onConfirm={onConfirmModal}
                />
            }
        </div>
    );
}

export default SelectLayout;