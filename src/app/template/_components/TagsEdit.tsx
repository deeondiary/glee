import React from 'react';
import {TEMPLATE_TAGS} from "@/src/constants/tags";
import Tag from "@/src/components/tag/Tag";
import styles from './TagsEdit.module.css'

interface TagSelectWrapperProps {
    onClickTag: (tag: string) => void;
    selectedTags: Array<string>;
    align: string;
}
function TagsEdit(props: TagSelectWrapperProps) {
    return (
        <div className={styles['tag-section--wrap']} style={{justifyContent: props.align}}>
            {  TEMPLATE_TAGS.map(tag => (
                <span key={tag} onClick={() => {props.onClickTag(tag)}} className={styles['tags--wrap']}>
                            <Tag type="round-select" text={tag} selected={props.selectedTags} />
                        </span>
            ))}
        </div>
    );
}

export default TagsEdit;