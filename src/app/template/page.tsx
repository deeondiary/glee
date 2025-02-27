'use client'
import React, {useEffect, useState} from 'react';
import styles from './page.module.css'
import Header from "@/src/components/header/Header";
import {TEMPLATE_TAGS_ALL} from "@/src/enum/tags";
import Tag from "@/src/components/tag/Tag";
import {getUserTemplate} from "@/src/api/template";
import {MyTemplate, MyTemplateArray} from "@/src/type/template";
import {useRouter} from "next/navigation";
import {dateTimeFormat} from "@/src/util/convert";

function TemplatePage() {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedTags, setSelectedTags] = useState<Array<string>>(['전체']);

    const [myTemplates, setMyTemplates] = useState<MyTemplateArray>([]);
    useEffect(() => {
        // TODO : API 호출 계속하지 않도록 수정 필요
        getUserTemplate()
            .then((data) => {
                // 선택한 태그 데이터만 넣어주도록 필터링
                if (selectedTags.includes('전체')) {
                    setMyTemplates(data.suggestions);
                } else {
                    const idArr: string[] = [];
                    selectedTags.forEach((selected) => {
                        data.suggestions.forEach((d: MyTemplate) => {
                            if (d.tags && d.tags.includes(selected)) {
                                const index = idArr.findIndex((v) => v === d.id);
                                if (index < 0) {
                                    idArr.push(d.id);
                                }
                            }
                        })
                    })
                    const filteredList = data.suggestions.filter((d: MyTemplate) => idArr.includes(d.id));
                    setMyTemplates(filteredList);
                }
            })
    }, [selectedTags]);
    const onClickTag = (tag: string) => {
        if (tag === '전체') {
            setSelectedTags(['전체']);
        } else {
            if (selectedTags.includes('전체')) {
                const index = selectedTags.indexOf('전체');
                selectedTags.splice(index, 1);
                setSelectedTags((prev) => [...prev, tag]);
            } else {
                if (selectedTags.includes(tag)) {
                    const index = selectedTags.indexOf(tag);
                    selectedTags.splice(index, 1);
                    setSelectedTags([...selectedTags]);
                } else {
                    setSelectedTags((prev) => [...prev, tag]);
                }
            }
        }
    }

    const router = useRouter();
    const goTemplateDetail = (id: string) => {
        router.push(`/template/${id}`);
    }
    return (
        <div className={styles['template-page--container']}>
            <div className="header--wrap"><Header /></div>
            <div className={styles['tab--wrap']}>
                <div className={activeTab === 0 ? styles['tab__active'] : ''} onClick={() => setActiveTab(0)}>MY</div>
                <div className={activeTab === 1 ? styles['tab__active'] : ''} onClick={() => setActiveTab(1)}>추천</div>
            </div>
            <div className={styles['tab-contents--wrap']}>
                <div className={styles['contents-num--wrap']}>
                    <div className="gr-95 body-2 weight-600">전체</div>
                    <div className="og-70 body-2 weight-700">{myTemplates && myTemplates.length}</div>
                </div>
            </div>
            <div className={styles['tag--wrap']}>
                { TEMPLATE_TAGS_ALL.map(tag => (
                    <span key={tag} onClick={() => {onClickTag(tag)}} className={styles['tags--wrap']}>
                                <Tag type="round-sort" text={tag} selected={selectedTags} />
                    </span>
                ))}
            </div>
            <div className={`${styles['templates--wrap']} scrollbar`}>
                { myTemplates.map((template => (
                    <div key={template.id} className={styles['template__list--wrap']} onClick={() => goTemplateDetail(template.id)}>
                        <div className="gr-50 label-2">{ dateTimeFormat(template.updated_at) }</div>
                        <div className={styles['template__contents']}>
                            { template.suggestion }
                        </div>
                        <div className={styles['template__tag--wrap']}>
                            {
                                template.tags.map((tag) => (
                                    <span key={tag}>
                                            <Tag type="squared" text={tag} />
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                )))}
            </div>
        </div>
    );
}

export default TemplatePage;