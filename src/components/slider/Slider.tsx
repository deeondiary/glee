import React from 'react';
import styles from './Slider.module.css'

function Slider() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.slider}>
                <div className={styles.slides}>
                    <div id="slide-1" style={{marginLeft: '20px'}}>
                        1
                    </div>
                    <div id="slide-2">
                        2
                    </div>
                    <div id="slide-3">
                        3
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Slider;