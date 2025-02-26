'use client'
import React, {useEffect, useState} from 'react';
import styles from './page.module.css'
import Image from "next/image";
import {TEMPLATE_TAGS} from "@/src/constants/tags";
import Tag from "@/src/components/tag/Tag";
import PlainButton from "@/src/components/button/PlainButton";
import Toast from "@/src/components/toast/Toast";
import {postSaveTemplate} from "@/src/api/select";
import {useBoundStore} from "@/src/store/stores";
import {useRouter} from "next/navigation";

function TemplateCreatePage() {
    const [toastShow, setToastShow] = useState<boolean>(false);
    const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
    const onClickTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            const index = selectedTags.indexOf(tag);
            selectedTags.splice(index, 1);
            setSelectedTags([...selectedTags]);
        } else if (selectedTags.length < 2) {
            setSelectedTags((prev) => [...prev, tag]);
        } else {
            setToastShow(true);
        }
    }
    useEffect(() => {
        if (toastShow) {
            setTimeout(() => {
                setToastShow(false);
            }, 1500);
        }
    }, [toastShow]);

    const router = useRouter();
    const store = useBoundStore();
    const onClickSaveButton = () => {
        const data = { suggestion: store.selectedTemplate, tags: selectedTags };
        postSaveTemplate(data)
            .then(() => {
                router.push('/template');
            })
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles['top-section--wrap']}>
                    <Image
                        src="/icon/template_saved_check.png"
                        width={48}
                        height={48}
                        alt="tempalte-saved-icon"
                    />
                    <div className="gr-90 subtitle-2 600">템플릿에 저장됐어요</div>
                    <div className="gr-70 body-2 600">태그를 선택하면 더 빠르게 찾아볼 수 있어요</div>
                </div>
                <div className={styles['tag-section--wrap']}>
                    {  TEMPLATE_TAGS.map(tag => (
                        <span key={tag} onClick={() => {onClickTag(tag)}} className={styles['tags--wrap']}>
                            <Tag type="round-select" text={tag} selected={selectedTags} />
                        </span>
                    ))}
                </div>
                <div className="mg-top-30">
                    <PlainButton borderRound={true} onClick={onClickSaveButton}>
                        템플릿에 저장하기
                    </PlainButton>
                </div>
                { toastShow &&
                <div className={styles['toast--wrap']}>
                    <Toast>템플릿은 2개까지 선택 가능해요</Toast>
                </div> }
            </div>
        </div>
    );
}

export default TemplateCreatePage;