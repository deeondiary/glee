'use client'
import React from 'react';
import Image from "next/image";
import styles from './header.module.css'
import {usePathname, useRouter} from "next/navigation";

function Header() {
    const pathname: string = usePathname();
    const router= useRouter();
    const selectPageHeader = () => {
        return (<div style={{color: 'red'}}>뒤로가기</div>)
    }
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
                <div className={styles['profile-pic']} onClick={() => router.push('/auth')}>
                </div>
            </>
        )
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                { pathname === '/' && mainPageHeader() }
                { pathname === '/test' && selectPageHeader() }
            </div>
        </div>
    );
}

export default Header;