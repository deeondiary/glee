'use client'
import React, {useState} from 'react';
import styles from './page.module.css'
import Image from "next/image";
import PlainButton from "@/src/components/button/PlainButton";
import {postSaveTemplate} from "@/src/api/select";
import {useBoundStore} from "@/src/store/stores";
import {useRouter} from "next/navigation";
import TagsEdit from "@/src/app/template/_components/TagsEdit";
import LayoutWrapper from "@/src/app/LayoutWrapper";

function TemplateCreatePage() {
    const [selectedTags, setSelectedTags] = useState<Array<string>>([]);

    const router = useRouter();
    const store = useBoundStore();
    const onClickSaveButton = () => {
        const data = {suggestion: store.selectedTemplate, tags: selectedTags};
        postSaveTemplate(data)
            .then(() => {
                router.push('/template');
            })
    }

    return (
        <LayoutWrapper>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles['top-section--wrap']}>
                        <Image
                            src="/icon/template_saved_check.png"
                            width={48}
                            height={48}
                            alt="tempalte-saved-icon"
                        />
                        <div className="gr-90 subtitle-2 weight-600">템플릿에 저장됐어요</div>
                        <div className="gr-70 body-2 weight-600">태그를 선택하면 더 빠르게 찾아볼 수 있어요</div>
                    </div>
                    <div className={styles['tag-section--wrap']}>
                        <TagsEdit selectedTags={selectedTags} setSelectedTags={setSelectedTags} align="center"/>
                    </div>
                    <div className="mg-top-30">
                        <PlainButton borderRound={true} onClick={onClickSaveButton}>
                            템플릿에 저장하기
                        </PlainButton>
                    </div>
                </div>
            </div>
        </LayoutWrapper>
    );
}

export default TemplateCreatePage;