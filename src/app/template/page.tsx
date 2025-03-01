'use client'
import React, {useEffect, useState} from 'react';
import styles from './page.module.css'
import {TEMPLATE_TAGS_ALL} from "@/src/enum/tags";
import Tag from "@/src/components/tag/Tag";
import {getUserRecommendedTemplates, getUserTemplate} from "@/src/api/template";
import {MyTemplate, MyTemplateArray} from "@/src/type/template";
import LayoutWrapper from "@/src/app/LayoutWrapper";
import useModalManage from "@/src/hook/useModal";
import {useBoundStore} from "@/src/store/stores";
import MyTemplateTab from "@/src/app/template/_components/MyTemplateTab";
import RecommendationTab from "@/src/app/template/_components/RecommendationTab";

function TemplatePage() {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedTags, setSelectedTags] = useState<Array<string>>(['전체']);
    const [myTemplates, setMyTemplates] = useState<MyTemplateArray>([]);

    const store = useBoundStore();
    const onClickTab = (tab: number) => {
        setActiveTab(tab);
    }

    const useModal = useModalManage({type: 'token-expired'});
    useEffect(() => {
        // TODO : API 호출 계속하지 않도록 수정 필요
        if (store.nickname) {
            getUserTemplate()
                .then((data) => {
                    // 선택한 태그 데이터만 넣어주도록 필터링
                    if (selectedTags.includes('전체')) {
                        setMyTemplates(data.suggestions.reverse());
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
                        setMyTemplates(filteredList.reverse());
                    }
                })
                .catch((err) => {
                    if (err.status === 401) {
                        useModal.openModal();
                    }
                })
        }
    }, [selectedTags]);

    const [recommendations, setRecommendations] = useState([]);
    useEffect(() => {
        getUserRecommendedTemplates()
            .then((response) => {
                setRecommendations(response.suggestions);
            })
    }, []);

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
    return (
        <LayoutWrapper>
            <div className={styles['template-page--container']}>
                <div className={styles['tab--wrap']}>
                    <div className={activeTab === 0 ? styles['tab__active'] : ''} onClick={() => onClickTab(0)}>MY
                    </div>
                    <div className={activeTab === 1 ? styles['tab__active'] : ''} onClick={() => onClickTab(1)}>추천
                    </div>
                </div>
                {store.nickname && <>
                    {activeTab === 0 &&
                        <div className={styles['tab-contents--wrap']}>
                            <div className={styles['contents-num--wrap']}>
                                <div className="gr-95 body-2 weight-600">전체</div>
                                <div className="og-70 body-2 weight-700">{myTemplates && myTemplates.length}</div>
                            </div>
                        </div>}
                    <div className={styles['tag--wrap']}>
                        {TEMPLATE_TAGS_ALL.map((tag, idx) => (
                            <span key={idx} onClick={() => {
                                onClickTag(tag)
                            }} className={styles['tags--wrap']}>
                                    <Tag type="round-sort" text={tag} selected={selectedTags}
                                         marginRight={idx === 10 ? '40px' : ''}/>
                        </span>
                        ))}
                    </div>
                </>}
                {activeTab === 0 ? <MyTemplateTab data={myTemplates}/> : <RecommendationTab data={recommendations} />}
            </div>
        </LayoutWrapper>
    );
}

export default TemplatePage;