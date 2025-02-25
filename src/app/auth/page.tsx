'use client'
import React from 'react';
import styles from './page.module.css'
import PlainButton from "@/src/components/button/PlainButton";
import Image from "next/image";

function Page() {
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`;
    const login = () => {
        window.location.href = link;
    }
    return (
        <div className={styles['auth__wrapper']}>
            <div>
                (gif 이미지 들어갈 예정)
            </div>
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
    );
}

export default Page;