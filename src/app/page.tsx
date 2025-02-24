'use client'
import styles from "./page.module.css";
import Image from "next/image";
import React, {useState} from "react";
import SelectLayout from "@/src/app/_select/SelectLayout";
import Header from "@/src/components/header/Header";

export default function Home() {
    const [show, setShow] = useState(false);

    return (
        <>
            <div className={styles.container}>
                <div>
                    <Header/>
                    <div className={styles['template-wrap']}>
                        <div className={styles.template}>
                            <div className={styles['template-icons__wrap']}>
                                <div>네모네모</div>
                                <div>
                                    <Image
                                        src="/icon/main_next.png"
                                        width={30}
                                        height={30}
                                        alt="icon-go-next"
                                    />
                                </div>
                            </div>
                            <div></div>
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
            </div>
            <div className={`${styles.wrapper} ${show ? styles.show : ''}`}>
                <SelectLayout show={show} setShow={setShow}/>
            </div>
        </>
    );
}
