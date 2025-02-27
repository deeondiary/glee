import React, {useEffect} from 'react';
import styles from './TemplateRequested.module.css'
import {useBoundStore} from "@/src/store/stores";
import {postGenerateTemplates} from "@/src/api/select";
import {TemplateGenerateParam} from "@/src/type/template";
import Header from "@/src/components/header/Header";

/* Step 04. 제안 요청 전송 (로딩 페이지)
- currentStep : 4
 */
function TemplateRequested() {
    const store = useBoundStore();
    let data: TemplateGenerateParam;
    useEffect(() => {
        console.log('use effect')
        if (store.selectChoice === 'image') {
            // 상황 > 이미지 업로드 했을 경우
            if (store.imageAnalyzeResult) {
                data = {
                    situation: store.imageAnalyzeResult.situation,
                    tone: store.imageAnalyzeResult.tone,
                    usage: store.imageAnalyzeResult.usage,
                    detail: store.imageAnalyzeResult.detail,
                }
            }
        } else {
            // 상황 > 직접 선택 했을 경우
            data = store.selectedOptionsSet
            console.log('here !!', data)
        }
        postGenerateTemplates(data)
            .then((response) => {
                store.setSuggestedTemplates(response.suggestions);
                store.goNextStep();
            })
    });
    return (
        <div className={styles.wrapper}>
            <Header />
            <div className={styles['contents--wrap']}>
                <div className={styles['text--wrap']}>
                    <div className="gr-95 title-2 weight-600">글이 작성되고 있어요...<br/>딱 맞는 글을 제안드릴게요</div>
                </div>
                <div className={styles['loading-gif--wrap']}>
                    <div className={styles['loading-gif']}></div>
                </div>
            </div>
        </div>
    );
}

export default TemplateRequested;