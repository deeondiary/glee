'use client'
import React, {useEffect} from 'react';
import styles from './SelectIfImage.module.css'
import Image from "next/image";
import {useBoundStore} from "@/src/store/stores";
import PlainButton from "@/src/components/button/PlainButton";
import ServiceDescription from "@/src/app/_select/_components/ServiceDescription";
import {useUiStore} from "@/src/store/ui-store";

/* Step 00. 상황 직접 선택 or 사진 첨부 여부 선택
- currentStep : 0
- selectChoice : 'select' / 'image'
 */
function SelectIfImage() {
    const store = useBoundStore();
    const uiStore = useUiStore();
    const onClickButton = () => {
        store.goNextStep();
    }
    const onClickShowDescription = () => {
        uiStore.setDescriptionShow(true);
    }
    useEffect(() => {
        store.setOtherSuggestionsReqCount(0);
    }, []);

    return (
        <div className={`${styles['select-if--container']} ${store.isMainPage ? '' : ''}`}>
            <div>
                <div className={styles['select-if__title--wrap']}>
                    <div className="title-2 weight-600">
                        막막한 글 쓰기,<br/>딱 맞는 글을 제안해드릴게요
                    </div>
                </div>
                <div className={styles['select-if__info--wrap']} onClick={onClickShowDescription}>
                    <Image
                        src="/icon/question.png"
                        width={24}
                        height={24}
                        alt="arrow-icon"
                        className="cp"
                    />
                    <div className="body-3 weight-600 cp" style={{color: 'white'}}>
                        커뮤니케이션 어시스트, 글 제안이란?
                    </div>
                </div>
                <div className={styles['select-if__card--wrap']}>
                    <div
                        className={`${styles['select-if_card']} ${store.selectChoice === 'option' && styles['select-if_card--active']}`}
                        onClick={() => store.setSelectChoice('option')}>
                        <Image
                            src="/icon/select_situation.png"
                            width={65}
                            height={60}
                            alt="select_situtation"
                        />
                        <div className={styles['select-if__card--text']}>상황을 직접 선택할게요</div>
                    </div>
                    <div
                        className={`${styles['select-if_card']} ${store.selectChoice === 'image' && styles['select-if_card--active']}`}
                        onClick={() => store.setSelectChoice('image')}>
                        <Image
                            src="/icon/select_image.png"
                            width={65}
                            height={60}
                            alt="select_image"
                        />
                        <div className={styles['select-if__card--text']}>사진을 첨부할게요</div>
                    </div>
                </div>
                <div className={styles['select-if__please--wrap']}>
                    {store.selectChoice === null ?
                        <div className={styles['select-if__please']}>
                            상황을 선택해주세요
                        </div> : <div style={{height: '38px'}}></div>}
                </div>
            </div>
            <div>
                { uiStore.descriptionShow &&  <ServiceDescription /> }
            </div>
            <div className="select-pages--button">
                <PlainButton disabled={store.selectChoice === null} onClick={onClickButton}>
                    다음
                </PlainButton>
            </div>
            {/*<div className={uiStore.descriptionShow ? styles['overlay-show'] : styles['overlay-hide']}>*/}
        </div>
    );
}

export default SelectIfImage;