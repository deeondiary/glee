import React from 'react';
import styles from './TemplateTabs.module.css'
import {copyTextUtil} from "@/src/util/utils";
import {useUiStore} from "@/src/store/ui-store";
import {TemplateDetailType, TemplateDetailTypeArray} from "@/src/type/template";
import RecommendationCard from "@/src/app/template/_components/RecommendationCard";

function RecommendationTab(props: { data: TemplateDetailTypeArray }) {
    const uiStore = useUiStore();
    const onClickCopyText = (index: number) => {
        const id = `suggestion-${index}`
        copyTextUtil(id, uiStore);
    }
    return (
        <>
            <div className={`${styles['rt--container']} scrollbar `}>
                {
                    props.data.map((item: TemplateDetailType, index: number) => (
                        <div key={index} onClick={() => onClickCopyText(index)}>
                            <RecommendationCard data={item} index={index} onClick={onClickCopyText} keyword={''}/>
                        </div>
                    ))
                }
            </div>
        </>

    );
}

export default RecommendationTab;