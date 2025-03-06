import React from 'react';
import styles from './RecentSearchList.module.css';
import Image from "next/image";
import {TemplateSearchHistory} from "@/src/type/template";

function RecentSearchList(props: {data: TemplateSearchHistory, onClickDelete: (index: number) => void, onClickSearch: (item: string) => void}) {
    return (
        <div className={styles.container}>
            <div className={styles['text--wrap']} onClick={() => props.onClickSearch(props.data.item)}>{props.data.item}</div>
            <Image
                src="/icon/delete_search.png"
                width={14}
                height={14}
                alt="delete-icon"
                className="cp"
                onClick={() => props.onClickDelete(props.data.index)}
            />
        </div>
    );
}

export default RecentSearchList;