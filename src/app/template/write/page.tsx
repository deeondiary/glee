'use client'
import React, {useRef, useState} from 'react';
import styles from './page.module.css'
import PlainButton from "@/src/components/button/PlainButton";
import Image from "next/image";
import PlainTextarea from "@/src/components/input/PlainTextarea";
import {useUiStore} from "@/src/store/ui-store";
import LayoutWrapper from "@/src/app/LayoutWrapper";
import {writeUserTemplateDetail} from "@/src/api/template";
import {TemplateWriteParam} from "@/src/type/template";
import {useRouter} from "next/navigation";

function TemplateWritePage() {
    const uiStore = useUiStore();
    const onClickTagSetting = () => {
        uiStore.setTagEditShow(true);
    }
    const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
    const [pageTags, setPageTags] = useState<Array<string>>([]);
    const onSaveTags = () => {
        const arr = JSON.parse(JSON.stringify(selectedTags));
        setPageTags(arr);
    }
    const router = useRouter();
    // TODO ref 사용 hook 만들기
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (inputRef.current) {
            inputRef.current.value = e.target.value;
            setSubmitDisabled(false);
        }
    }
    const onClickSaveData = () => {
        const data = {
            title: '',
            suggestion: inputRef.current && inputRef.current.value,
            tags: selectedTags
        } as TemplateWriteParam;
        writeUserTemplateDetail(data).then(() => {
            uiStore.setToastText('작성 완료되었습니다.');
            uiStore.setToastShow(true);
            setTimeout(() => {
                router.back();
            }, 1000);
        })
    }

    return (
        <LayoutWrapper tags={selectedTags} setTags={setSelectedTags} onCloseTagDrawer={onSaveTags}>
            <div className={styles.container}>
                <div className={styles['contents--wrap']}>
                    <div className={styles['top-contents--wrap']}>
                        <div>
                            <div className="gr-95 body-2 weight-600">태그를 선택해주세요</div>
                            <div className={styles['tags-section--wrap']}>
                                <div className={styles['tags--wrap']}>
                                    {pageTags.map((tag) => (
                                        <span key={tag}>{tag}</span>
                                    ))}
                                </div>
                                <Image onClick={onClickTagSetting} className="cp"
                                       src="/icon/add_tag_button.svg" alt="add-tag" width={26} height={26}/>
                            </div>
                            <div className="mg-top-32 body-2 gr-95 weight-600">
                                나만의 템플릿 내용을 입력해주세요
                            </div>
                        </div>
                        <div className={styles['textarea--wrap']}>
                            <PlainTextarea height={'100% !important'} placeholder="내용을 입력해주세요" inputRef={inputRef}
                                           onChangeInput={onChangeInput}/>
                        </div>
                    </div>
                    <div className={styles['button-submit--wrap']}>
                        <PlainButton disabled={submitDisabled} onClick={onClickSaveData}>저장하기</PlainButton>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}

export default TemplateWritePage;