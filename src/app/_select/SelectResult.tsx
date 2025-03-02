import React, {useEffect, useState} from 'react';
import styles from './SelectResult.module.css'
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useBoundStore} from "@/src/store/stores";
import {useUiStore} from "@/src/store/ui-store";
import CustomSlider from "@/src/components/slider/CustomSlider";
import {copyTextUtil} from "@/src/util/utils";
import Header from "@/src/components/header/Header";

/* Step 06. AI 글 제안 3가지 보기
- currentStep : 6
 */
function SelectResult(props: {history: boolean}) {
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
        copyTextUtil(id, uiStore);
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
            <div className={styles['header--wrap']}>
                {props.history && <Header />}
            </div>
            <div className={styles['slider--wrap']}>
                <CustomSlider onClickSaveTemplate={saveTemplate} onClickCopyText={copyText} />
            </div>
            <div className={styles['bottom--wrap']}>
                { (store.otherSuggestionsReqCount < 3 && !props.history) &&
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