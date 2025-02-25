'use client'
import styles from "./page.module.css";
import Image from "next/image";
import React, {useEffect} from "react";
import SelectLayout from "@/src/app/_select/SelectLayout";
import {useBoundStore} from "@/src/store/stores";
import Header from "@/src/components/header/Header";

export default function Home() {
    const store = useBoundStore();

    useEffect(() => {
        store.resetAll();
        store.setIsMainPage(true);
    }, []);
    return (
        <div className={styles['main--wrap']}>
            <div className="header--wrap"><Header/></div>
            <div className="middle-section" style={{marginBottom: '80px'}}>
                <div className={styles['template-wrap']}>
                    <div className={styles.template}>
                        <div className={styles['template-icons__wrap']}>
                            <div>
                                {/*<Image*/}
                                {/*    src="/"*/}
                                {/*    width={57}*/}
                                {/*    height={57}*/}
                                {/*    alt="logo"*/}
                                {/*/>*/}
                            </div>
                            <div>
                                <Image
                                    src="/icon/main_next.png"
                                    width={30}
                                    height={30}
                                    alt="icon-go-next"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="body-2 weight-600 gr-90">글 제안 템플릿</div>
                            <div className="body-3 weight-500 gr-70 mg-top-9">상황별 저장된 글을 쉽고 빠르게 탐색하세요</div>
                        </div>
                    </div>
                </div>
                <div className={styles['logo-area-wrap']}>
                    <Image
                        src="/icon/logo.png"
                        width={70}
                        height={55}
                        alt="logo"
                    />
                    <div className="title-1 weight-600">어떤 글을 써드릴까요?</div>
                    <div className={styles['logo-area-text-wrap']} style={{color: '#282929'}}>
                        <div className="subtitle-2" style={{color: '#434344'}}>상사에게 보고하는 메일</div>
                        <div className="subtitle-2" style={{color: '#5B5B5C'}}>어른께 안부 인사</div>
                        <div className="body-1" style={{color: '#727479'}}>정중하게 부탁 거절</div>
                        <div className="body-2" style={{color: '#8D8F95'}}>진심 담긴 위로 한마디</div>
                    </div>
                </div>
            </div>
            <div className={`${styles['select-start__button']} ${!store.isMainPage ? styles.show : ''}`}>
                <SelectLayout/>
            </div>
        </div>
    );
}
