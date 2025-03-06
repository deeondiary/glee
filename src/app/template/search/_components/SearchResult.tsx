import React, {useState} from 'react';
import styles from './SearchResult.module.css'
import {TemplateDetailTypeArray} from "@/src/type/template";
import MyTemplateCard from "@/src/app/template/_components/MyTemplateCard";
import RecommendationCard from "@/src/app/template/_components/RecommendationCard";
import {copyTextUtil} from "@/src/util/utils";
import {useUiStore} from "@/src/store/ui-store";

interface SearchResultProps {
    myData: TemplateDetailTypeArray;
    recommendedData: TemplateDetailTypeArray;
    keyword: string;
}
function SearchResult(props: SearchResultProps) {
    const [activeTab, setActiveTab] = useState(0);
    const uiStore = useUiStore();
    const onClickCopyText = (index: number) => {
        const id = `suggestion-${index}`
        copyTextUtil(id, uiStore);
    }
    return (
        <div>
            <div className={styles['tab--wrap']}>
                <div className={styles['tab-container']} onClick={() => setActiveTab(0)}>
                    <div className={`${styles['tab-box']} ${activeTab === 0 && styles['tab-box__active']}`}>MY</div>
                </div>
                <div className={styles['tab-container']} onClick={() => setActiveTab(1)}>
                    <div className={`${styles['tab-box']} ${activeTab === 1 && styles['tab-box__active']}`}>추천</div>
                </div>
            </div>
            <div className={styles['list-container']}>
                {
                    activeTab === 0 ?
                        <>
                            {props.myData?.length === 0 ?
                                <div className="gr-40 label-1 weight-500 center pd-top-15">검색 결과가 없습니다.</div> :
                                <div className={`scrollbar ${styles['list-card--wrap']}`}>
                                    {props.myData?.map(item => (
                                        <div key={item.id}>
                                            <MyTemplateCard data={item} keyword={props.keyword} />
                                        </div>
                                    ))}
                                </div>}
                        </> :
                        <>
                            {props.recommendedData?.length === 0 ?
                                <div className="gr-40 label-1 weight-500 center pd-top-15">검색 결과가 없습니다.</div> :
                                <div className={`scrollbar ${styles['list-card--wrap']}`}>
                                    {props.recommendedData?.map((item, index) => (
                                        <div key={item.id} style={{padding: '0 20px'}}>
                                            <RecommendationCard data={item} onClick={onClickCopyText} index={index} keyword={props.keyword} />
                                        </div>
                                    ))}
                                </div>}
                        </>
                }
            </div>
        </div>
    );
}

export default SearchResult;