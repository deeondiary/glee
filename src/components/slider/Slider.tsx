import React, {useEffect, useState} from 'react';
import styles from './Slider.module.css'
import Image from "next/image";
import {useBoundStore} from "@/src/store/stores";

interface SliderProps {
    setToastShow: (show: boolean) => void;
    onClickSaveTemplate: (id: number) => void;
    onClickCopyText: (id: string) => void;
}
function Slider(props: SliderProps) {
    const store = useBoundStore();
    const [active, setActive] = useState(0);
    useEffect(() => {
        (() => {
            window.addEventListener("touchmove", () => catchTouchEvent());
        })();
    });
    const catchTouchEvent = () => {
        const slides = document.getElementById('slides');
        if (slides) {
            const slideLocation = slides.scrollLeft
            if (slideLocation <= 193) {
                setActive(0);
            } else if (slideLocation > 193 && slideLocation <= 435) {
                setActive(1);
            } else if (slideLocation > 435) {
                setActive(2);
            }
        }
        // slide1 = document.getElementById("slide-1");
        // slide2 = document.getElementById("slide-2");
        // slide3 = document.getElementById("slide-3");
        // console.log(slide3X)
        //
        // setSlide1X(slide1.getBoundingClientRect().x);
        // setSlide2X(slide2.getBoundingClientRect().x);
        // setSlide3X(slide3.getBoundingClientRect().x);
        //
        // if (slide1X > -30 && slide1X < 360) {
        //     setActive(0)
        // } else if (slide2X > -20 && slide2X < 275) {
        //     setActive(1)
        // } else {
        //     setActive(2)
        // }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.slider}>
                <div className={styles.slides} id="slides" onMouseLeave={catchTouchEvent} onDragEnd={catchTouchEvent} onTouchEnd={catchTouchEvent}>
                    <div id="slide-1" className={active === 0 ? styles.active : ''}>
                        <div className="body-1 weight-700">
                            요약된 제목 1
                        </div>
                        <div className={`${styles['slide-contents']} scrollbar`}>
                            <div id="content-1" className="pd-right-20">
                                { store.suggestedTemplates && store.suggestedTemplates[0] }
                            </div>
                        </div>
                        <div className={styles['buttons--wrap']}>
                            <Image src="/icon/copy_text.png" alt="copy-text-icon" onClick={() => props.onClickCopyText('content-1')}
                                   width={32} height={32} className="cp" />
                            <div className={styles['button--save-as-template']} onClick={() => props.onClickSaveTemplate(0)}>
                                <Image src="/icon/check.png" alt="check-icon"
                                       width={20} height={20} />
                                템플릿 저장
                            </div>
                        </div>
                    </div>
                    <div id="slide-2" className={active === 1 ? styles.active : ''}>
                        <div className="body-1 weight-700">
                            요약된 제목 2
                        </div>
                        <div className={`${styles['slide-contents']} scrollbar`}>
                            <div id="content-2" className="pd-right-20">
                                { store.suggestedTemplates && store.suggestedTemplates[1] }
                            </div>
                        </div>
                        <div className={styles['buttons--wrap']}>
                            <Image src="/icon/copy_text.png" alt="copy-text-icon" onClick={() => props.onClickCopyText('content-2')}
                                   width={32} height={32} className="cp" />
                            <div className={styles['button--save-as-template']}  onClick={() => props.onClickSaveTemplate(1)}>
                                <Image src="/icon/check.png" alt="check-icon"
                                       width={20} height={20} />
                                템플릿 저장
                            </div>
                        </div>
                    </div>
                    <div id="slide-3" className={active === 2 ? styles.active : ''}>
                        <div className="body-1 weight-700">
                            요약된 제목 3
                        </div>
                        <div className={`${styles['slide-contents']} scrollbar`}>
                            <div id="content-3" className="pd-right-20">
                                { store.suggestedTemplates && store.suggestedTemplates[2] }
                            </div>
                        </div>
                        <div className={styles['buttons--wrap']}>
                            <Image src="/icon/copy_text.png" alt="copy-text-icon" onClick={() => props.onClickCopyText('content-3')}
                                   width={32} height={32} className="cp" />
                            <div className={styles['button--save-as-template']} onClick={() => props.onClickSaveTemplate(2)}>
                                <Image src="/icon/check.png" alt="check-icon"
                                       width={20} height={20} />
                                템플릿 저장
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Slider;