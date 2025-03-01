import React from 'react';
import {RecommendedTemplate} from "@/src/type/template";
import styles from './TemplateTabs.module.css'
import Image from "next/image";
import Tag from "@/src/components/tag/Tag";
import {copyTextUtil} from "@/src/util/utils";
import {useUiStore} from "@/src/store/ui-store";

function RecommendationTab(props: { data: Array<RecommendedTemplate> }) {
    const uiStore = useUiStore();
    const onClickCopyText = (index: number) => {
        const id = `suggestion-${index}`
        copyTextUtil(id, uiStore);
    }
    return (
        <>
            <div className={`${styles['rt--container']} scrollbar `}>
                {
                    props.data.map((item: RecommendedTemplate, index: number) => (
                        <div className={styles['rt-list-card']} key={index}>
                            <div className={styles['rt-list-card--top-section']}>
                                <div className={styles['template__tag--wrap']}>
                                    {
                                        item.tags.map((tag) => (
                                            <span key={tag}>
                                            <Tag type="squared" text={tag}/>
                                    </span>
                                        ))
                                    }
                                </div>
                                <Image src="/icon/copy_gray.png" alt="icon" width={22} height={22} className="cp"
                                       onClick={() => onClickCopyText(index)}/>
                            </div>
                            <div className="gr-50 label-2 weight-500">
                                {item.title}
                            </div>
                            <div id={`suggestion-${index}`} className="gr-90 body-3 weight-500 mg-top-12">
                                {item.suggestion}
                            </div>
                        </div>
                    ))
                }
            </div>
        </>

    );
}

export default RecommendationTab;