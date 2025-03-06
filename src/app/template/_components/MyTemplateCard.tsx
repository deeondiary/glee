import React from 'react';
import styles from './MyTemplateCard.module.css';
import Tag from "@/src/components/tag/Tag";
import {dateTimeFormat, highlightSearchWordUtil} from "@/src/util/utils";
import {TemplateDetailType} from "@/src/type/template";

function MyTemplateCard(props: { data: TemplateDetailType, keyword: string }) {


    return (
        <div className={styles['template__list--wrap']}>
            <div className={styles['template__tag--wrap']}>
                {
                    props.data.tags.map((tag) => (
                        <span key={tag}>
                            <Tag type="squared" text={tag}/>
                        </span>
                    ))
                }
            </div>
            <div className={styles['template__contents']}>
                {highlightSearchWordUtil(props.data.title, props.keyword)}
            </div>
            <div className="gr-50 label-2">{dateTimeFormat(props.data.updated_at)}</div>
        </div>
    );
}

export default MyTemplateCard;