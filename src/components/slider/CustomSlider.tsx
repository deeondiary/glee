import React from "react";
import Slider from "react-slick";
import styles from "./CustomSlider.module.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import {useBoundStore} from "@/src/store/stores";

interface SliderProps {
    onClickSaveTemplate: (id: number) => void;
    onClickCopyText: (id: string) => void;
}

const CustomSlider = (props: SliderProps) => {
    const store = useBoundStore();
    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 1,
        centerMode: true,
        centerPadding: "10px",
        variableWidth: true,
    };
    const CustomSlide1 = () => {
        return (
            <div className={styles['slide-wrap']}>
                <div>
                    <div className="body-1 weight-700">
                        요약된 제목 1
                    </div>
                    <div className={`${styles['slide-contents']} scrollbar`}>
                        <div id="content-1" className="pd-right-20">
                            {store.suggestedTemplates && store.suggestedTemplates[0]}
                        </div>
                    </div>
                </div>
                <div className={styles['buttons--wrap']}
                     style={{justifyContent: store.nickname ? 'space-between' : 'flex-end'}}>
                    <Image src="/icon/copy_text.png" alt="copy-text-icon"
                           onClick={() => props.onClickCopyText('content-1')}
                           width={32} height={32} className="cp"/>
                    { store.nickname &&
                        <div className={styles['button--save-as-template']}
                             onClick={() => props.onClickSaveTemplate(0)}>
                            <Image src="/icon/check.png" alt="check-icon"
                                   width={20} height={20}/>
                            템플릿 저장
                        </div> }
                </div>
            </div>
        );
    }
    const CustomSlide2 = () => {
        return (
            <div className={styles['slide-wrap']}>
                <div>
                    <div className="body-1 weight-700">
                        요약된 제목 2
                    </div>
                    <div className={`${styles['slide-contents']} scrollbar`}>
                        <div id="content-1" className="pd-right-20">
                            {store.suggestedTemplates && store.suggestedTemplates[1]}
                        </div>
                    </div>
                </div>
                <div className={styles['buttons--wrap']}
                     style={{justifyContent: store.nickname ? 'space-between' : 'flex-end'}}>
                    <Image src="/icon/copy_text.png" alt="copy-text-icon"
                           onClick={() => props.onClickCopyText('content-1')}
                           width={32} height={32} className="cp"/>
                    { store.nickname &&
                    <div className={styles['button--save-as-template']}
                         onClick={() => props.onClickSaveTemplate(1)}>
                        <Image src="/icon/check.png" alt="check-icon"
                               width={20} height={20}/>
                        템플릿 저장
                    </div> }
                </div>
            </div>
        );
    }
    const CustomSlide3 = () => {
        return (
            <div className={styles['slide-wrap']}>
                <div>
                    <div className="body-1 weight-700">
                        요약된 제목 3
                    </div>
                    <div className={`${styles['slide-contents']} scrollbar`}>
                        <div id="content-1" className="pd-right-20">
                            {store.suggestedTemplates && store.suggestedTemplates[2]}
                        </div>
                    </div>
                </div>
                <div className={styles['buttons--wrap']}
                     style={{justifyContent: store.nickname ? 'space-between' : 'flex-end'}}>
                    <Image src="/icon/copy_text.png" alt="copy-text-icon"
                           onClick={() => props.onClickCopyText('content-1')}
                           width={32} height={32} className="cp"/>
                    { store.nickname &&
                    <div className={styles['button--save-as-template']}
                         onClick={() => props.onClickSaveTemplate(2)}>
                        <Image src="/icon/check.png" alt="check-icon"
                               width={20} height={20}/>
                        템플릿 저장
                    </div>
                    }
                </div>
            </div>
        );
    }

    return (
        <Slider {...settings}>
            <CustomSlide1 />
            <CustomSlide2 />
            <CustomSlide3 />
        </Slider>
    );
}

export default CustomSlider;