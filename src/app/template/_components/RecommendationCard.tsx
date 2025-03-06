import React from 'react';
import styles from './RecommendationCard.module.css'
import Tag from "@/src/components/tag/Tag";
import Image from "next/image";
import {TemplateDetailType} from "@/src/type/template";
import {highlightSearchWordUtil} from "@/src/util/utils";

interface RecommendationCardProps {
    data: TemplateDetailType;
    index: number;
    onClick: (idx: number) => void;
    keyword: string;
}
function RecommendationCard(props: RecommendationCardProps) {
    return (
        <div className={styles['rt-list-card']}>
            <div className={styles['rt-list-card--top-section']}>
                <div className={styles['template__tag--wrap']}>
                    {
                        props.data.tags.map((tag) => (
                            <span key={tag}>
                                <Tag type="squared" text={tag}/>
                            </span>
                        ))
                    }
                </div>
                <Image src="/icon/copy_gray.png" alt="icon" width={22} height={22} className="cp"
                       onClick={() => props.onClick(props.index)}/>
            </div>
            <div className="gr-50 label-2 weight-500">
                {highlightSearchWordUtil(props.data.title, props.keyword)}
            </div>
            <div id={`suggestion-${props.index}`} className="gr-90 body-3 weight-500 mg-top-12">
                {highlightSearchWordUtil(props.data.suggestion, props.keyword)}
            </div>
        </div>
    );
}

export default RecommendationCard;