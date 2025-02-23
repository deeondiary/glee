'use client'
import React from 'react';
import styles from './page.module.css'
import PlainButton from "@/src/components/button/PlainButton";
import Image from "next/image";

function Page(props) {
    const REST_API_KEY = 'a75ea54c9b211fe0b7400e9d8686acbc';
    const REDIRECT_URI = 'http://175.45.195.123:8000/kakao/callback';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    const login = () => {
        console.log("login");
        window.location.href = link;
    }
    return (
        <div className={styles['auth__wrapper']}>
            <div>
                (gif 이미지 들어갈 예정)
            </div>
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
    );
}

export default Page;