'use client'
import React from 'react';
import styles from './page.module.css'
import PlainButton from "@/src/components/button/PlainButton";
import Image from "next/image";
import {useBoundStore} from "@/src/store/stores";
import Header from "@/src/components/header/Header";
import {useRouter} from "next/navigation";
import LayoutWrapper from "@/src/app/LayoutWrapper";

function ProfilePage() {
    const store = useBoundStore();
    const router = useRouter();
    const onClickLogout = () => {
        // TODO 카카오 로그아웃
        localStorage.clear();
        setTimeout(() => {
            router.push('/');
        }, 1000)
    }
    return (
        <LayoutWrapper>
        <div className={styles.wrapper}>
            <Header />
            <div className={styles.container}>
                <div className={styles['profile-section']}>
                    {store.profile ?
                        <Image src={store.profile ? store.profile : ''} className={styles['profile-image']}
                               width={48} height={48} alt="profile-image"/>
                        : <div className={styles['profile-image']}></div>}
                    <div className="weight-600 subtitle-1 gr-70">
                        {store.nickname}
                    </div>
                </div>
            </div>
            <div className={styles['profile-button--wrap']}>
                <PlainButton onClick={onClickLogout}>
                    로그아웃
                </PlainButton>
            </div>
        </div>
        </LayoutWrapper>
    );
}

export default ProfilePage;