import React, {Ref} from 'react';
import styles from './WriteDetail.module.css'

interface WriteDetailProps {
    ref: Ref<HTMLTextAreaElement> | undefined;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
function WriteDetail(props: WriteDetailProps) {
    return (
        <div className={styles.wrapper}>
            <div className="title-2 gr-95 weight-600">
                추가로 필요한 디테일이 있나요?
            </div>
            <div className="body-2 gr-70 weight-600 mg-top-14">
                AI 분석과 추가 디테일을 기반으로 맞춤형 글을 써드릴게요
            </div>
            <div className={styles['input-text--wrap']}>
                <textarea className={styles['input-text']}
                          placeholder={'입력해주세요'}
                          ref={props.ref} onChange={props.onChange} />
            </div>
        </div>
    );
}

export default WriteDetail;