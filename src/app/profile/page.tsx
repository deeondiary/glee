'use client'
import React from 'react';
import styles from './page.module.css'
import PlainButton from "@/src/components/button/PlainButton";
import Image from "next/image";
import {useBoundStore} from "@/src/store/stores";
import LayoutWrapper from "@/src/app/LayoutWrapper";

function ProfilePage() {
    const store = useBoundStore();
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`;
    const onClickButton = () => {
        // TODO 카카오 로그아웃
        if (store.nickname) {
            localStorage.clear();
            store.resetSelectProcess();
            store.resetAuth();
            store.resetTemplateData();
        } else {
            window.location.href = link;
        }
    }
    return (
        <LayoutWrapper>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles['profile-section']}>
                        {store.profile ?
                            <Image src={store.profile ? store.profile : ''} className={styles['profile-image']}
                                   width={48} height={48} alt="profile-image"/>
                            : <div className={styles['profile-image']}></div>}
                        <div className="weight-600 subtitle-1 gr-70">
                            {store.nickname ? store.nickname : '로그인이 필요합니다'}
                        </div>
                    </div>
                </div>
                <div className={styles['profile-button--wrap']}>
                    <PlainButton onClick={onClickButton}>
                        {store.nickname ? '로그아웃' : '로그인'}
                    </PlainButton>
                </div>
            </div>
        </LayoutWrapper>
    );
}

export default ProfilePage;