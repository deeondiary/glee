'use client'
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import styles from './Header.module.css'
import {usePathname, useRouter} from "next/navigation";
import {useBoundStore} from "@/src/store/stores";

function Header() {
    const router = useRouter();
    const store = useBoundStore();
    const pathname = usePathname();

    const onClickGoBackStep = () => {
        if (store.currentStep === 0) {
            store.setModalShow(true);
        } else {
            store.goBackStep();
        }
    }
    const onClickClose = () => {
        console.log('???')
        store.setModalShow(true);
    }
    const onClickGoPrevPage = () => {
        router.back();
    }
    const [iconShow, setIconShow] = useState<boolean>(false);
    useEffect(() => {
        if (store.isMainPage) {
            setIconShow(false);
        } else {
            setTimeout(() => {
                setIconShow(true);
            }, 1000);
        }
    }, [store.isMainPage, iconShow]);

    const mainPageHeader = () => {
        return (
            <div className={styles.container}>
                <Image
                    src="/icon/chat.png"
                    width={24}
                    height={24}
                    alt="chat-icon"
                    className="cp"
                />
                <div>
                    {store.nickname ?
                        <Image
                            src="/icon/profile_loggedin.png"
                            width={32}
                            height={32}
                            alt="profile-icon"
                            className="cp"
                            onClick={() => router.push('/profile')}
                        /> :
                        <Image
                            src="/icon/profile_loggedout.png"
                            width={32}
                            height={32}
                            alt="profile-icon"
                            className="cp"
                            onClick={() => router.push('/auth')}
                        />
                    }
                </div>
            </div>
        )
    }
    const selectPageHeader = () => {
        return (
            <>
                {
                    iconShow &&
                    <div className={styles['container-white']}>
                        <Image
                            src="/icon/arrow_back.png"
                            width={24}
                            height={24}
                            alt="arrow-icon"
                            className="cp"
                            onClick={onClickGoBackStep}
                        />
                        {(store.currentStep === 2 || store.currentStep === 3) &&
                        <div className="gr-90 body-2 weight-600">{store.currentStep === 2 ? '분석 결과' : '글 제안'}</div> }
                        <Image
                            src="/icon/close.png"
                            width={24}
                            height={24}
                            alt="close-icon"
                            className="cp"
                            onClick={onClickClose}
                        />
                    </div>}
            </>
        )
    }
    const goBackCloseTitleHeader = (title: string, isClose: boolean) => {
        return (
            <div className={styles['container-white']}>
                <Image
                    src="/icon/arrow_back.png"
                    width={24}
                    height={24}
                    alt="arrow-icon"
                    className="cp"
                    onClick={onClickGoPrevPage}
                />
                <div className="gr-90 body-2 weight-600">{title}</div>
                { isClose ?
                    <Image
                        src="/icon/close.png"
                        width={24}
                        height={24}
                        alt="close-icon"
                        className="cp"
                        onClick={onClickClose}
                    /> :  <div style={{width: '24px'}}></div>}
            </div>)
    }
    const onlyGoBackHeader = () => {
        return (
            <div className={styles['container-white']}>
                <Image
                    src="/icon/arrow_back.png"
                    width={24}
                    height={24}
                    alt="arrow-icon"
                    className="cp"
                    onClick={onClickGoPrevPage}
                />
            </div>)
    }

    return (
        <div className={styles.wrapper}>
            {
                pathname === '/' &&
                (store.isMainPage ? mainPageHeader() : selectPageHeader())
            }
            {pathname === '/auth' && onlyGoBackHeader()}
            {pathname === '/profile' && goBackCloseTitleHeader('프로필', false)}
            {pathname === '/result' && goBackCloseTitleHeader('글 제안', true)}
        </div>
    );
}

export default Header;