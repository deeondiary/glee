'use client'
import React, {useRef, useState} from 'react';
import Header from "@/src/components/header/Header";
import styles from './page.module.css'
import PlainButton from "@/src/components/button/PlainButton";
import Image from "next/image";
import PlainTextarea from "@/src/components/input/PlainTextarea";
import {useUiStore} from "@/src/store/ui-store";
import BottomDrawer from "@/src/components/bottom-drawer/BottomDrawer";
import TagsEdit from "@/src/app/template/_components/TagsEdit";
import useTagManage from "@/src/hook/useTag";
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
    const useTag = useTagManage({tags: selectedTags, setTags: setSelectedTags});

    // TODO ref 사용 hook 만들기
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (inputRef.current) {
            inputRef.current.value = e.target.value;
        }
    }
    const onClickSaveData = () => {
        console.log('태그', pageTags);
        if (inputRef.current) {
            console.log('작성 내용', inputRef.current.value);
        }
        // TODO 생성 api 연동
    }
    return (
        <div className={styles.container}>
            <Header />
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
                                   src="/icon/add_tag_button.svg" alt="add-tag" width={26} height={26} />
                        </div>
                        <div className="mg-top-32 body-2 gr-95 weight-600">
                            나만의 템플릿 내용을 입력해주세요
                        </div>
                    </div>
                    <div className={styles['textarea--wrap']}>
                        <PlainTextarea height={'100% !important'} placeholder="내용을 입력해주세요" inputRef={inputRef} onChangeInput={onChangeInput}/>
                    </div>
                </div>
                <div className={styles['button-submit--wrap']}>
                    <PlainButton onClick={onClickSaveData}>저장하기</PlainButton>
                </div>
            </div>
            <div>
                {
                    uiStore.tagEditShow &&
                    <BottomDrawer title='태그 편집' onClose={useTag.onCloseTagEdit} onCloseAction={onSaveTags}>
                        <TagsEdit align="flex-start" selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
                    </BottomDrawer>
                }
            </div>
        </div>
    );
}

export default TemplateWritePage;