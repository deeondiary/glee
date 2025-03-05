'use client'
import React, {useRef} from 'react';
import styles from './page.module.css'
import WriteDetail from "@/src/app/suggestion/_component/WriteDetail";
import PlainButton from "@/src/components/button/PlainButton";
import {useBoundStore} from "@/src/store/stores";
import {ImageAnalyzeResult} from "@/src/type/select";
import {PATH} from "@/src/enum/path";
import {useRouter} from "next/navigation";
import {postGenerateTemplates} from "@/src/api/select";
import {useUiStore} from "@/src/store/ui-store";
import {TemplateGenerateParam} from "@/src/type/template";
import useModalManage from "@/src/hook/useModal";

/* Step 04 - 1. 추가 디테일 직접 입력
- currentStep : 4
 */
function Page() {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (inputRef.current) {
            inputRef.current.value = e.target.value ? e.target.value : '';
            const newValue = {...store.imageAnalyzeResult as ImageAnalyzeResult, detail: e.target.value}
            store.setImageAnalyzeResult(newValue);
        }
    }
    const store = useBoundStore();
    const uiStore = useUiStore();
    const router = useRouter();
    const useModal = useModalManage({type: 'server-error'});
    const onClickButton = () => {
        const data = {
            situation: store.imageAnalyzeResult?.situation,
            tone: store.imageAnalyzeResult?.tone,
            usage: store.imageAnalyzeResult?.usage,
            detail: store.imageAnalyzeResult?.detail ? store.imageAnalyzeResult.detail : '',
        }
        uiStore.setSuggestionLoadingState('analysis');
        uiStore.setIsSuggestionLoading(true);
        postGenerateTemplates(data as TemplateGenerateParam)
            .then((response) => {
                if (response.suggestions) {
                    store.setSuggestedTemplates(response.suggestions);
                    router.push(PATH.analyze_view_results);
                    uiStore.setIsSuggestionLoading(false);
                }
            })
            .catch(() => {
                uiStore.setIsSuggestionLoading(false);
                useModal.openModal();
            })
    }

    return (
        <div className={styles.container}>
            <div className={styles['contents--wrapper']}>
                <WriteDetail ref={inputRef} onChange={onChange}/>
            </div>
            <div className={styles['button--wrapper']}>
                <PlainButton onClick={onClickButton}>글 제안받기</PlainButton>
            </div>
        </div>
    );
}

export default Page;