import React from 'react';
import styles from './Loading.module.css'
import Image from "next/image";

interface LoadingProps {
    isPage?: boolean;
}

function Loading({isPage = false}: LoadingProps) {
    return (
        <div className={isPage ? styles['loading--wrap'] : styles['loading-overlay--wrap']}>
            <div className={styles['loading-container']}>
                <Image src="/image/glee_spinner.gif" alt="loading.gif" width="290" height="163"/>
            </div>
        </div>
    );
}

export default Loading;