import React, {useState} from 'react';
import styles from './SelectLayout.module.css'
import Image from "next/image";
import SelectIfImage from "@/src/app/_select/_components/_choice-image/SelectIfImage";
import {useBoundStore} from "@/src/store/stores";
import SelectUploadImage from "@/src/app/_select/_components/_choice-image/SelectUploadImage";
import SelectUploadImageResult from "@/src/app/_select/_components/_choice-image/SelectUploadImageResult";
import SelectResult from "@/src/app/_select/_components/SelectResult";
import Header from "@/src/components/header/Header";
import TemplateRequested from "@/src/app/_select/_components/TemplateRequested";
import SelectWriteDetail from "@/src/app/_select/_components/_choice-image/SelectWriteDetail";
import SelectOptionsLayout from "@/src/app/_select/_components/_choice-select/SelectOptionsLayout";

function SelectLayout() {
    const store = useBoundStore();
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
            {!store.isMainPage &&
                <>
                    {store.currentStep === 0 &&
                        <SelectIfImage/>}
                    {(store.currentStep === 1 && store.selectChoice === 'image') &&
                        <SelectUploadImage/>}
                    {(store.currentStep === 1 && store.selectChoice === 'option') &&
                        <SelectOptionsLayout />}
                    {(store.currentStep === 2) &&
                        <SelectUploadImageResult/>}
                    {(store.currentStep === 3) &&
                        <SelectWriteDetail/>}
                    {(store.currentStep === 4) &&
                        <TemplateRequested/>}
                    {(store.currentStep === 5) &&
                        <SelectResult/>}
                </>
            }
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