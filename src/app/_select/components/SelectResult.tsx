import React from 'react';
import styles from './SelectResult.module.css'
import Slider from "@/src/components/slider/Slider";

function SelectResult() {
    return (
        <div className={styles.wrapper}>
            <div className={styles['upper--wrap']}>
                <Slider/>
            </div>
            <div className={styles['bottom--wrap']}>
                <div className={styles['reselect-button']}>
                    dd
                </div>
            </div>
        </div>
    );
}

export default SelectResult;