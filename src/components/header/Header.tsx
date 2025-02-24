'use client'
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import styles from './Header.module.css'
import {useRouter} from "next/navigation";
import {useBoundStore} from "@/src/store/stores";

function Header() {
    // const pathname: string = usePathname();
    const router = useRouter();
    const store = useBoundStore();
    const onClickGoBack = () => {
        if (store.currentStep === 0) {
            store.setModalShow(true);
        } else {
            store.goBackStep();
        }
    }
    const onClickClose = () => {
        store.setModalShow(true);
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
    }, [store.isMainPage])
    const mainPageHeader = () => {
        return (
            <>
                <Image
                    src="/icon/chat.png"
                    width={24}
                    height={24}
                    alt="chat-icon"
                    className="cp"
                />
                {/*TODO 로그인 유무에 따른 이미지 변경*/}
                <div className={styles['profile-pic']} onClick={() => router.push('/auth')}>
                </div>
            </>
        )
    }
    const selectPageHeader = () => {
        return (
            <>
                {
                    iconShow &&
                    <div className={styles['header-select']}>
                        <Image
                            src="/icon/arrow_back.png"
                            width={24}
                            height={24}
                            alt="arrow-icon"
                            className="cp"
                            onClick={onClickGoBack}
                        />
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

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {store.isMainPage && mainPageHeader()}
                {!store.isMainPage && selectPageHeader()}
            </div>
        </div>
    );
}

export default Header;