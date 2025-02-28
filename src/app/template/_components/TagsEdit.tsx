import React from 'react';
import {TEMPLATE_TAGS} from "@/src/enum/tags";
import Tag from "@/src/components/tag/Tag";
import styles from './TagsEdit.module.css'
import useTagManage from "@/src/hook/useTag";

interface TagSelectWrapperProps {
    selectedTags: Array<string>;
    setSelectedTags: (selectedTags: Array<string>) => void;
    align: string;
}
function TagsEdit(props: TagSelectWrapperProps) {
    const useTag = useTagManage({tags: props.selectedTags, setTags: props.setSelectedTags});
    return (
        <div className={styles['tag-section--wrap']} style={{justifyContent: props.align}}>
            {  TEMPLATE_TAGS.map(tag => (
                <span key={tag} onClick={() => {useTag.onClickTag(tag)}} className={styles['tags--wrap']}>
                    <Tag type="round-select" text={tag} selected={props.selectedTags} />
                </span>
            ))}
        </div>
    );
}

export default TagsEdit;