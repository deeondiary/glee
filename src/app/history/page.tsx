'use client'
import React, {useEffect, useState} from 'react';
import Header from "@/src/components/header/Header";
import styles from './page.module.css'
import {getUserSuggestionHistory} from "@/src/api/template";
import {dateTimeFormat} from "@/src/util/utils";
import {TemplateHistory, TemplateHistoryArray} from "@/src/type/template";
import {useRouter} from "next/navigation";
import {useBoundStore} from "@/src/store/stores";
import {PATH} from "@/src/enum/path";

function HistoryPage() {
    const [pageData, setPageData] = useState<TemplateHistoryArray>();
    useEffect(() => {
        getUserSuggestionHistory()
            .then((response) => {
                if (response) {
                    setPageData(response.history?.reverse());
                }
            })
        // TODO 권한 없을 경우 에러처리 추가
    }, []);
    const router = useRouter();
    const store = useBoundStore();
    const onClickGoTemplateSelect = (data: TemplateHistory) => {
        store.setSuggestedTemplates(data.suggestions);
        router.push(PATH.analyze_view_results + '?history=true')
    }
    return (
        <>
            <Header/>
            <div className={`${styles.container} scrollbar`}>
                {pageData && pageData.map((data, index) => (
                    <div key={index} className={styles['history-card']} onClick={() => onClickGoTemplateSelect(data)}>
                        <div className="gr-50 label-1 weight-600">{dateTimeFormat(data['updated_at'])}</div>
                        <div className={styles['history-title']}>{data.suggestions[0]?.title}</div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default HistoryPage;