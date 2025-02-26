import React, {useEffect, useState} from 'react';
import styles from './SelectResult.module.css'
import Slider from "@/src/components/slider/Slider";
import Header from "@/src/components/header/Header";
import Image from "next/image";
/* Step 03. AI 글 제안 3가지 보기
- currentStep : 3
 */
function SelectResult() {
    const [toastShow, setToastShow] = useState(false);
    useEffect(() => {
        if (toastShow) {
            setTimeout(() => {
                setToastShow(false);
            }, 1000);
        }
    }, [toastShow]);
    return (
        <div className={styles.wrapper}>
            <div className={styles['header--wrap']}><Header /></div>
            <div className={styles['slider--wrap']}>
                <Slider setToastShow={setToastShow} />
            </div>
            <div className={styles['bottom--wrap']}>
                <div className={styles['reselect-button']}>
                    <Image src="/icon/refresh.png" alt="refresh-icon"
                           width={16} height={16} />
                    다른 제안 보기
                </div>
                { toastShow &&
                <div className={styles.toast}>복사되었습니다.</div> }
            </div>
        </div>
    );
}

export default SelectResult;