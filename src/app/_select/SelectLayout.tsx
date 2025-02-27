import React from 'react';
import styles from './SelectLayout.module.css'
import Image from "next/image";
import Modal from "@/src/components/modal/Modal";
import SelectIfImage from "@/src/app/_select/components/SelectIfImage";
import {useBoundStore} from "@/src/store/stores";
import SelectUploadImage from "@/src/app/_select/components/SelectUploadImage";
import SelectUploadImageResult from "@/src/app/_select/components/SelectUploadImageResult";
import SelectResult from "@/src/app/_select/components/SelectResult";
import Header from "@/src/components/header/Header";
import SelectTemplateLoading from "@/src/app/_select/components/SelectTemplateLoading";

function SelectLayout() {
    const store = useBoundStore();
    // const onCancelModal = () => {
    //     store.setModalShow(false);
    // }
    // const onConfirmModal = () => {
    //     store.setModalShow(false);
    //     store.setIsMainPage(true);
    //     store.resetAll()
    // }

    const onClickSuggestButton = () => {
        store.setIsMainPage(false);
    }
    return (
        <>
            {
                (store.currentStep !== 4) &&
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
                            <SelectTemplateLoading/>}
                        {(store.currentStep === 4) &&
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
        </>
    );
}

export default SelectLayout;