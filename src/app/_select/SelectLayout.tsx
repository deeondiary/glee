import React from 'react';
import styles from './SelectLayout.module.css'
import Image from "next/image";
import PlainButton from "@/src/components/button/PlainButton";
import Modal from "@/src/components/modal/Modal";
import SelectIfImage from "@/src/app/_select/components/SelectIfImage";
import {useBoundStore} from "@/src/store/stores";
import SelectUploadImage from "@/src/app/_select/components/SelectUploadImage";
import SelectUploadImageResult from "@/src/app/_select/components/SelectUploadImageResult";
import {postUploadImage} from "@/src/api/image";
import {useRouter} from "next/navigation";
import SelectResult from "@/src/app/_select/components/SelectResult";
import Header from "@/src/components/header/Header";

function SelectLayout() {
    const store = useBoundStore();
    const router = useRouter();
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
            postUploadImage(store.uploadedImageData);
            store.goNextStep();
        } else if (store.currentStep === 2) {
            store.goNextStep();
        } else {
            store.goNextStep();
        }
    }
    const onClickSuggestButton = () => {
        store.setIsMainPage(false);
    }
    return (
        <>
            {
                (store.currentStep !== 3) &&
                <div className="header--wrap">
                    <Header/>
                </div>
            }
            <div className="select-middle--wrap">
                {!store.isMainPage &&
                    <>
                        {store.currentStep === 0 &&
                            <SelectIfImage/>}
                        {(store.currentStep === 1 && store.selectChoice === 'image') &&
                            <SelectUploadImage/>}
                        {(store.currentStep === 2) &&
                            <SelectUploadImageResult/>}
                        {(store.currentStep === 3) &&
                            <SelectResult/>}
                    </>
                }
            </div>
            {
                store.isMainPage &&
                <div className={styles['btn-state__wrap']} onClick={onClickSuggestButton}>
                    <Image
                        src="/icon/arrow_top.png"
                        width={15}
                        height={15}
                        alt="arrow-icon"
                        className={styles['btn-up']}
                    />
                    <div className={styles['btn-state__text__wrap']}>
                        <div style={{height: '18px', width: '18px', backgroundColor: 'white'}}></div>
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
        </>
    );
}

export default SelectLayout;