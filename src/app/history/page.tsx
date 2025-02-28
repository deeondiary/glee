import React from 'react';
import Header from "@/src/components/header/Header";
import styles from './page.module.css'

function HistoryPage() {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles['history-card']}>
                    <div className="gr-50 label-1 weight-600">2025.02.28</div>
                    <div className={styles['history-title']}>요약 문장 한줄로 보여주기</div>
                </div>
                <div className={styles['history-card']} style={{marginTop: '8px'}}>
                    <div className="gr-50 label-1 weight-600">2025.02.28</div>
                    <div className={styles['history-title']}>요약 문장 한줄로 보여주기 텍스트 길면 텍스트가 너무너무 길면 너무너무 길면 너무너무 길면 너무너무 길면</div>
                </div>
            </div>
        </>
    );
}

export default HistoryPage;