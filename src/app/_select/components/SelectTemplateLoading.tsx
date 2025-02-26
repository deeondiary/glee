import React, {useEffect} from 'react';
import styles from './SelectTemplateLoading.module.css'
import {useBoundStore} from "@/src/store/stores";
import {postGenerateTemplates} from "@/src/api/ai";
import {TemplateGenerateParam} from "@/src/type/ai";

/* Step 03 - 1. 템플릿 받아오기
- currentStep : 3
 */
function SelectTemplateLoading() {
    const store = useBoundStore();
    useEffect(() => {
        if (store.imageAnalyzeResult) {
            let data: TemplateGenerateParam;
            if (store.selectChoice === 'image') {
                // 상황 > 이미지 업로드 했을 경우
                data = {
                    situation: store.imageAnalyzeResult.situation,
                    tone: store.imageAnalyzeResult.tone,
                    usage: store.imageAnalyzeResult.usage,
                    detail: '',
                }
            } else {
                // 상황 > 직접 선택 했을 경우
                data = {
                    situation: '',
                    tone: '',
                    usage: '',
                    detail: '',
                }
            }
            postGenerateTemplates(data)
                .then((response) => {
                    store.setSuggestedTemplates(response.suggestions);
                    store.goNextStep();
                })
        }
    });
    return (
        <div className="select-pages--container">
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

export default SelectTemplateLoading;