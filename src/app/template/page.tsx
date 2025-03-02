'use client'
import React, {useEffect, useState} from 'react';
import styles from './page.module.css'
import {TEMPLATE_TAGS_ALL} from "@/src/enum/tags";
import Tag from "@/src/components/tag/Tag";
import {getUserRecommendedTemplates, getUserTemplate} from "@/src/api/template";
import {TemplateDetailType, TemplateDetailTypeArray} from "@/src/type/template";
import LayoutWrapper from "@/src/app/LayoutWrapper";
import useModalManage from "@/src/hook/useModal";
import {useBoundStore} from "@/src/store/stores";
import MyTemplateTab from "@/src/app/template/_components/MyTemplateTab";
import RecommendationTab from "@/src/app/template/_components/RecommendationTab";

function TemplatePage() {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedTags, setSelectedTags] = useState<Array<string>>(['전체']);

    const [myTemplatesOriginal, setMyTemplatesOriginal] = useState<TemplateDetailTypeArray>([]);
    const [myTemplates, setMyTemplates] = useState<TemplateDetailTypeArray>([]);
    const [recommendationsOriginal, setRecommendationOriginal] = useState<TemplateDetailTypeArray>([]);
    const [recommendations, setRecommendations] = useState<TemplateDetailTypeArray>([]);
    useEffect(() => {
        // console.log('effect 1 nickname', store.nickname)
        // console.log('effect 1 token', localStorage.getItem("token"))
        getUserRecommendedTemplates()
            .then((response) => {
                setRecommendationOriginal(response.suggestions);
                setRecommendations(response.suggestions);
            })
        if (store.nickname || localStorage.getItem("token")) {
            // console.log('effect 2')
            getUserTemplate()
                .then((data) => {
                    const reversed = data.suggestions.reverse();
                    setMyTemplatesOriginal(reversed);
                    setMyTemplates(reversed);
                })
                .catch((err) => {
                    if (err.status === 401) {
                        useModal.openModal();
                    }
                })
        }
    }, []);
    const store = useBoundStore();
    const onClickTab = (tab: number) => {
        setActiveTab(tab);
        setSelectedTags(['전체']);
    }
    useEffect(() => {
        if (activeTab === 0) {
            setMyTemplates(filterDataByTags(myTemplatesOriginal));
        } else {
            setRecommendations(filterDataByTags(recommendationsOriginal));
        }
    }, [selectedTags, activeTab]);

    const filterDataByTags = (data: TemplateDetailTypeArray) => {
        if (selectedTags.includes('전체')) {
            return data;
        } else {
            const idArr: string[] = [];
            selectedTags.forEach((selected) => {
                data.forEach((d: TemplateDetailType) => {
                    if (d.tags && d.tags.includes(selected)) {
                        const index = idArr.findIndex((v) => v === d.id);
                        if (index < 0) {
                            idArr.push(d.id);
                        }
                    }
                })
            })
            const filteredList = data.filter((d: TemplateDetailType) => idArr.includes(d.id));
            return filteredList;
        }
    }
    const useModal = useModalManage({type: 'token-expired'});

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
                {activeTab === 0 ? <MyTemplateTab data={myTemplates}/> : <RecommendationTab data={recommendations}/>}
            </div>
        </LayoutWrapper>
    );
}

export default TemplatePage;