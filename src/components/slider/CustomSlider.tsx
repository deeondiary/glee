import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import styles from "./CustomSlider.module.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import {useBoundStore} from "@/src/store/stores";
import {SuggestedResponsesArray} from "@/src/type/select";

interface SliderProps {
    onClickSaveTemplate: (id: number) => void;
    onClickCopyText: (id: string) => void;
}

const CustomSlider = (sliderProps: SliderProps) => {
    const store = useBoundStore();
    const [activeSlide, setActiveSlide] = useState(0);
    const settings = {
        dots: false,
        infinite: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "10px",
        variableWidth: true,
        afterChange: (current: React.SetStateAction<number>) => setActiveSlide(current)
    };
    const [data, setData] = useState<SuggestedResponsesArray>();
    useEffect(() => {
        if (store.suggestedTemplates?.length > 0) {
            setData(store.suggestedTemplates)
        }
    }, [store.suggestedTemplates]);
    const CustomSlide = (props: { index: number, onClickCopy: () => void, onClickSave: () => void }) => {
        return (
            <div id={`slide${props.index}`}
                 className={`${styles['slide-wrap']} ${activeSlide === props.index ? 'slick-active-template' : ''}`}>
                <div>
                    <div className="body-1 weight-700 pd-right-20">
                        {data && data[props.index].title}
                    </div>
                    <div className={`${styles['slide-contents']} scrollbar`}>
                        <div id="content-1" className="pd-right-20">
                            {data && data[props.index].content}
                        </div>
                    </div>
                </div>
                <div className={styles['buttons--wrap']}
                     style={{justifyContent: store.nickname ? 'space-between' : 'flex-end'}}>
                    <Image src="/icon/copy_text.png" alt="copy-text-icon"
                           onClick={props.onClickCopy}
                           width={32} height={32} className="cp"/>
                    {store.nickname &&
                        <div className={styles['button--save-as-template']}
                             onClick={props.onClickSave}>
                            <Image src="/icon/check.png" alt="check-icon"
                                   width={20} height={20}/>
                            템플릿 저장
                        </div>}
                </div>
            </div>
        );
    }

    return (
        <Slider {...settings}>
            <CustomSlide index={0} onClickCopy={() => sliderProps.onClickCopyText('content-0')}
                         onClickSave={() => sliderProps.onClickSaveTemplate(0)}/>
            <CustomSlide index={1} onClickCopy={() => sliderProps.onClickCopyText('content-1')}
                         onClickSave={() => sliderProps.onClickSaveTemplate(1)}/>
            <CustomSlide index={2} onClickCopy={() => sliderProps.onClickCopyText('content-2')}
                         onClickSave={() => sliderProps.onClickSaveTemplate(2)}/>
        </Slider>
    );
}

export default CustomSlider;