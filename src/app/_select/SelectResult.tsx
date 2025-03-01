import React, {useEffect, useState} from 'react';
import styles from './SelectResult.module.css'
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useBoundStore} from "@/src/store/stores";
import {useUiStore} from "@/src/store/ui-store";
import CustomSlider from "@/src/components/slider/CustomSlider";

/* Step 06. AI 글 제안 3가지 보기
- currentStep : 6
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

    const uiStore = useUiStore();
    const copyText = (id: string) => {
        const contents = document.getElementById(id);
        try {
            if (contents) {
                navigator.clipboard.writeText(contents.innerText);
                uiStore.setToastText('복사되었습니다.');
                uiStore.setToastShow(true);
            }
        } catch (e) {
            console.log(e, '복사 실패');
        }
    }

    const router = useRouter();
    /**
     * 템플릿 저장하기
     */
    const saveTemplate = (index: number) => {
        store.setSelectedTemplate(store.suggestedTemplates[index]);
        router.push('/template/create');
    }
    /**
     * 다른 제안 요청 (max 3회 호출)
     */
    const onClickRequestOtherSuggestions = () => {
        store.setOtherSuggestionsReqCount(store.otherSuggestionsReqCount + 1);
        store.goBackStep();
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles['header--wrap']}></div>
            <div className={styles['slider--wrap']}>
                <CustomSlider onClickSaveTemplate={saveTemplate} onClickCopyText={copyText} />
            </div>
            <div className={styles['bottom--wrap']}>
                { store.otherSuggestionsReqCount < 3 &&
                <div className={styles['reselect-button']} onClick={onClickRequestOtherSuggestions}>
                    <Image src="/icon/refresh.png" alt="refresh-icon"
                           width={16} height={16} />
                    다른 제안 보기
                </div> }
            </div>
        </div>
    );
}

export default SelectResult;