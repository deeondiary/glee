import React from 'react';
import styles from './Loading.module.css'

function Loading() {
    return (
        <div className={styles['loading--wrap']}>
            <div className={styles['loader']}></div>
        </div>
    );
}

export default Loading;