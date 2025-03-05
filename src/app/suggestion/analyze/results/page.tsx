'use client'
import React, {useEffect, useState} from 'react';
import styles from './page.module.css'
import Image from "next/image";
import {useRouter, useSearchParams} from "next/navigation";
import {useBoundStore} from "@/src/store/stores";
import {useUiStore} from "@/src/store/ui-store";
import CustomSlider from "@/src/components/slider/CustomSlider";
import {copyTextUtil} from "@/src/util/utils";
import Header from "@/src/components/header/Header";
import {PATH} from "@/src/enum/path";
import {postGenerateTemplates} from "@/src/api/select";
import {TemplateGenerateParam} from "@/src/type/template";

/* Step 06. AI 글 제안 3가지 보기
- currentStep : 6
 */
function Page() {
    const [toastShow, setToastShow] = useState(false);
    const store = useBoundStore();
    useEffect(() => {
        if (toastShow) {
            setTimeout(() => {
                setToastShow(false);
            }, 1000);
        }
    }, [toastShow]);
    const query = useSearchParams();
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
        router.push(PATH.analyze_select_result);
    }
    /**
     * 다른 제안 요청 (max 3회 호출)
     */
    const onClickRequestOtherSuggestions = () => {
        store.setOtherSuggestionsReqCount(store.otherSuggestionsReqCount + 1);
        uiStore.setSuggestionLoadingState('analysis');
        uiStore.setIsSuggestionLoading(true);
        if (store.otherSuggestionsReqCount < 4) {
            postGenerateTemplates((store.selectChoice === 'image' ? store.imageAnalyzeResult : store.selectedOptionsSet) as TemplateGenerateParam)
                .then((response) => {
                    if (response.suggestions) {
                        store.setSuggestedTemplates(response.suggestions);
                        uiStore.setIsSuggestionLoading(false);
                    }
                })
        }
    }

    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles['slider--wrap']}>
                <CustomSlider onClickSaveTemplate={saveTemplate} onClickCopyText={copyText} />
            </div>
            <div className={styles['bottom--wrap']}>
                { (store.otherSuggestionsReqCount < 3 && query.get('history') !== 'true' && !uiStore.isSuggestionLoading) &&
                <div className={styles['reselect-button']} onClick={onClickRequestOtherSuggestions}>
                    <Image src="/icon/refresh.png" alt="refresh-icon" width={16} height={16} />
                    다른 제안 보기
                </div> }
            </div>
        </div>
    );
}

export default Page;