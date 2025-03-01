import React, {useEffect, useState} from 'react';
import styles from "./Onboarding.module.css";
import LoginSlider from "@/src/components/slider/LoginSlider";
import PlainButton from "@/src/components/button/PlainButton";
import Image from "next/image";
import {useBoundStore} from "@/src/store/stores";
import {loginKaKao} from "@/src/api/auth";

function Onboarding() {
    const login = () => {
        store.setOnboardingShow(false);
        loginKaKao();
    }
    const [sliderHeight, setSliderHeight] = useState(200);
    useEffect(() => {
        if (visualViewport && typeof visualViewport !== 'undefined') {;
            setSliderHeight(visualViewport.height - 163)
        }
    }, [visualViewport]);
    const store = useBoundStore();
    const onClickGoMain = () => {
        store.setOnboardingShow(false);
    }
    return (
        <>
            <div className={styles['auth-header']} onClick={onClickGoMain}>
                둘러보기
            </div>
            <div className={styles['auth--wrapper']}>
                <LoginSlider height={sliderHeight} />
                <div className={styles['auth-button--wrap']}>
                    <PlainButton onClick={login} bgColor="#FEE500" color="#000000">
                        <Image
                            src="/icon/kakao.png"
                            width={20}
                            height={20}
                            alt="kakao-icon"
                        />
                        <span style={{marginLeft: '10px'}}>카카오로 계속하기</span>
                    </PlainButton>
                </div>
            </div>
        </>
    );
}

export default Onboarding;