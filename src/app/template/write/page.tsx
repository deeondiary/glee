'use client'
import React, {useEffect, useState} from 'react';
import styles from './page.module.css'
import PlainButton from "@/src/components/button/PlainButton";
import Image from "next/image";
import {useUiStore} from "@/src/store/ui-store";
import LayoutWrapper from "@/src/app/LayoutWrapper";
import {writeUserTemplateDetail} from "@/src/api/template";
import {TemplateWriteParam} from "@/src/type/template";
import {useRouter} from "next/navigation";
import TextInput from "@/src/components/input/TextInput";
import Textarea from "@/src/components/input/Textarea";

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

    const [submitDisabled, setSubmitDisabled] = useState(true);

    const [title, setTitle] = useState<string>("");
    const [suggestion, setSuggestion] = useState<string>("");

    const onClickSaveData = () => {
        uiStore.setLoading(true);

        const data = {
            title: title,
            suggestion: suggestion,
            tags: selectedTags
        } as TemplateWriteParam;

        writeUserTemplateDetail(data).then(() => {
            uiStore.setLoading(false);
            uiStore.setToastText('작성 완료되었습니다.');
            uiStore.setToastShow(true);
            setTimeout(() => {
                router.back();
            }, 1000);
        })


    }

    useEffect(() => {
        if (title !== '' && suggestion !== '') {
            setSubmitDisabled(false);
        } else {
            setSubmitDisabled(true);
        }
    }, [title, suggestion]);


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
                                <div onClick={onClickTagSetting}>
                                    { pageTags.length === 2 ?
                                    <div className={styles['tag-edit__button']}>수정</div>
                                    : <Image className="cp" src="/icon/add_tag_button.svg" alt="add-tag" width={26} height={26}/>}
                                </div>
                            </div>
                            <div className="mg-top-32 body-2 gr-95 weight-600">
                                제목을 입력해주세요
                            </div>
                            <div className="mg-top-22">
                                <TextInput placeholder="제목을 입력해주세요" setValue={setTitle} color="#434344" max={20} />
                            </div>
                            <div className="mg-top-32 body-2 gr-95 weight-600">
                                내용을 입력해주세요
                            </div>
                        </div>
                        <div className={styles['textarea--wrap']}>
                            <Textarea height={'100%'} bdColor="#FFF1DF" backColor="white"
                                      placeholder="내용을 입력해주세요" value={suggestion} setValue={setSuggestion} />
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