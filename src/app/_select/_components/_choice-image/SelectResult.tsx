import React, {useEffect, useState} from 'react';
import styles from './SelectResult.module.css'
import Slider from "@/src/components/slider/Slider";
import Header from "@/src/components/header/Header";
import Image from "next/image";
import Toast from "@/src/components/toast/Toast";
import {useRouter} from "next/navigation";
import {useBoundStore} from "@/src/store/stores";
/* Step 05. AI 글 제안 3가지 보기
- currentStep : 5
 */
function SelectResult() {
    const [toastShow, setToastShow] = useState(false);
    const store = useBoundStore();
    useEffect(() => {
        if (toastShow) {
            setTimeout(() => {
                setToastShow(false);
            }, 1000);
        }
    }, [toastShow]);

    const copyText = (id: string) => {
        const contents = document.getElementById(id);
        try {
            if (contents) {
                navigator.clipboard.writeText(contents.innerText);
                setToastShow(true);
            }
        } catch (e) {
            console.log(e, '복사 실패');
        }
    }

    const router = useRouter();
    const saveTemplate = (index: number) => {
        store.setSelectedTemplate(store.suggestedTemplates[index]);
        router.push('/template/create');
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles['header--wrap']}><Header /></div>
            <div className={styles['slider--wrap']}>
                <Slider setToastShow={setToastShow} onClickSaveTemplate={saveTemplate} onClickCopyText={copyText} />
            </div>
            <div className={styles['bottom--wrap']}>
                <div className={styles['reselect-button']}>
                    <Image src="/icon/refresh.png" alt="refresh-icon"
                           width={16} height={16} />
                    다른 제안 보기
                </div>
                { toastShow &&
                    <div className={styles['toast--wrap']}>
                        <Toast>복사되었습니다.</Toast>
                    </div> }
            </div>
        </div>
    );
}

export default SelectResult;