import React, {useEffect, useState} from 'react';
import styles from './Slider.module.css'
import Image from "next/image";
import {useRouter} from "next/navigation";

function Slider(props: {setToastShow: (value: boolean) => void}) {
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

    const copyText = (id: string) => {
        const contents = document.getElementById(id);
        try {
            if (contents) {
                navigator.clipboard.writeText(contents.innerText);
                props.setToastShow(true);
            }
        } catch (e) {
            console.log(e, '복사 실패');
        }
    }

    const router = useRouter();
    const onClickSaveTemplate = () => {
        router.push('/');
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
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultrices scelerisque dolor, a tristique ex scelerisque ac. Vivamus pharetra diam quis odio eleifend vulputate. Sed mi quam, efficitur ac nisl vitae, pretium elementum mauris. Etiam dignissim ut nisi nec iaculis. Duis ex mi, accumsan ut augue in, lacinia aliquet neque. Mauris placerat vitae mi vitae eleifend. Mauris lacus mauris, sodales ac est nec, molestie bibendum arcu. Maecenas aliquam ultrices turpis ac pellentesque. Vestibulum lorem purus, accumsan a molestie malesuada, feugiat id nibh. Suspendisse accumsan pulvinar eros ut luctus. Duis lacinia turpis molestie neque faucibus, ac rutrum quam tincidunt. Suspendisse quis ligula enim. Etiam tempus eleifend lacus, a suscipit lectus hendrerit eu.

                                Vivamus non massa fringilla, pretium odio id, vulputate justo. Vivamus ultrices, purus in porttitor congue, nisl sem faucibus neque, non posuere eros justo ut metus. Morbi porta nisl non leo tincidunt dignissim. Fusce eleifend erat eu libero malesuada, sed gravida mi varius. Nunc accumsan, quam vel sollicitudin gravida, sem eros lacinia est, et facilisis urna lacus vel massa. Curabitur sed facilisis neque. Aliquam nec euismod orci. Praesent facilisis dui at tellus vestibulum rhoncus sit amet et lorem. Sed laoreet risus eu tempus rutrum. Quisque a porta velit. Pellentesque ultricies nisl sit amet ex facilisis, vitae fermentum purus fermentum.

                                Ut tempus a odio ac vulputate. Duis in odio leo. Vivamus ac porttitor ipsum. Morbi hendrerit lectus eu lacus euismod placerat in in odio. Proin feugiat nunc libero, scelerisque elementum arcu imperdiet sed. Praesent imperdiet ex est, ac maximus quam consequat eget. Quisque ultrices elementum vestibulum. Integer arcu dolor, ullamcorper eu tincidunt eu, venenatis in orci. Nam eros quam, facilisis ut sem sit amet, dictum cursus mauris. Ut a laoreet lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse hendrerit posuere magna, sit amet maximus nulla molestie quis. Sed mollis nunc libero, vitae tincidunt leo venenatis a. Maecenas rutrum eget tellus at eleifend.

                                Vestibulum malesuada at ligula id pulvinar. Nam vitae aliquet est, vel sollicitudin odio. In hac habitasse platea dictumst. Suspendisse rutrum tortor ac libero tristique, vel porttitor erat fringilla. Quisque gravida lorem id volutpat dapibus. Fusce suscipit mauris a nisl vehicula, id finibus est accumsan. Phasellus cursus rhoncus bibendum. Aenean auctor id ligula sit amet faucibus. Proin nec dui sit amet magna commodo tristique. Mauris eu est enim. Etiam dignissim porta metus id ultrices. Donec at nunc luctus, euismod risus nec, luctus tellus. Quisque tortor mi, lobortis quis lectus blandit, accumsan lacinia urna. Phasellus ipsum turpis, dignissim et quam nec, lacinia interdum orci. In non venenatis sapien, in luctus tellus. Donec commodo nisl quis nunc scelerisque, sed lacinia tellus pharetra.
                            </div>
                        </div>
                        <div className={styles['buttons--wrap']} onClick={onClickSaveTemplate}>
                            <Image src="/icon/copy_text.png" alt="copy-text-icon" onClick={() => copyText('content-1')}
                                   width={32} height={32} className="cp" />
                            <div className={styles['button--save-as-template']}>
                                <Image src="/icon/check.png" alt="copy-text-icon"
                                       width={32} height={32} />
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
                                말을 왜 안듣니
                            </div>
                        </div>
                        <div className={styles['buttons--wrap']} onClick={onClickSaveTemplate}>
                            <Image src="/icon/copy_text.png" alt="copy-text-icon" onClick={() => copyText('content-2')}
                                   width={32} height={32} className="cp" />
                            <div className={styles['button--save-as-template']}>
                                <Image src="/icon/check.png" alt="copy-text-icon"
                                       width={32} height={32} />
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
                                3333333
                            </div>
                        </div>
                        <div className={styles['buttons--wrap']} onClick={onClickSaveTemplate}>
                            <Image src="/icon/copy_text.png" alt="copy-text-icon" onClick={() => copyText('content-3')}
                                   width={32} height={32} className="cp" />
                            <div className={styles['button--save-as-template']}>
                                <Image src="/icon/check.png" alt="copy-text-icon"
                                       width={32} height={32} />
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