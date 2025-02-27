import React, {useRef} from 'react';
import styles from './SelectWriteDetail.module.css'
import WriteDetail from "@/src/app/_select/_components/WriteDetail";
import PlainButton from "@/src/components/button/PlainButton";
import {useBoundStore} from "@/src/store/stores";
import {ImageAnalyzeResult} from "@/src/type/select";

/* Step 03 - 1. 추가 디테일 직접 입력
- currentStep : 2
 */
function SelectWriteDetail() {
    const store = useBoundStore();
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (inputRef.current) {
            inputRef.current.value = e.target.value;
        }
    }
    const onClickButton = () => {
        if (inputRef.current) {
            const newValue = store.imageAnalyzeResult as ImageAnalyzeResult;
            newValue.detail = inputRef.current.value;
            store.setImageAnalyzeResult(newValue);

            store.goNextStep();
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles['contents--wrapper']}>
                <WriteDetail ref={inputRef} onChange={onChange} />
            </div>
            <div className={styles['button--wrapper']}>
                <PlainButton onClick={onClickButton}>글 제안받기</PlainButton>
            </div>
        </div>
    );
}

export default SelectWriteDetail;