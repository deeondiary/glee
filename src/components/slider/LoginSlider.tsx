import React from 'react';
import Slider from "react-slick";
import styles from './LoginSlider.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

function LoginSlider(props: {height: number}) {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: (dots: React.ReactNode) => (
            <div
                style={{
                    width: '100%',
                    position: 'absolute',
                    bottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <ul> {dots} </ul>
            </div>
        ),
        dotsClass: 'dots_custom'
    };
    const CustomSlider1 = () => {
        return (
            <div className={styles.wrapper} style={{height: props.height}}>
                <div className={styles.container}>
                    <div className="title-2 weight-700 gr-95 mg-top-14">
                        원하는 글을 쉽고<br/> 빠르게 제안받아요
                    </div>
                    <div className="subtitle-2 weight-600 gr-70 mg-top-26 mg-bottom-26">
                        상황별 필요한 글을 똑똑한 AI가 제안해줄게요
                    </div>
                    <div className={styles['image--wrapper']}>
                        <Image src="/image/login_image_1.png" alt="login-image" width="217" height="280" />
                    </div>
                </div>
            </div>
        )
    }
    const CustomSlider2 = () => {
        return (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className="title-2 weight-700 gr-95 mg-top-14">
                        제안받은 글을 저장하고<br/> 필요할 때 찾아봐요
                    </div>
                    <div className="subtitle-2 weight-600 gr-70 mg-top-26 mg-bottom-40">
                        나만의 템플릿을 만들어 메시지를 관리해보세요
                    </div>
                    <div className={styles['image--wrapper']}>
                        <Image src="/image/login_image_2.png" alt="login-image" width="197" height="222" />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <Slider {...settings}>
            <CustomSlider1/>
            <CustomSlider2/>
        </Slider>
    );
}

export default LoginSlider;