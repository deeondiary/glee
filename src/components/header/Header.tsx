'use client'
import React from 'react';
import Image from "next/image";
import styles from './Header.module.css'
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useBoundStore} from "@/src/store/stores";
import {useUiStore} from "@/src/store/ui-store";
import {PATH} from "@/src/enum/path";

const Header = () => {
    const router = useRouter();
    const store = useBoundStore();
    const uiStore = useUiStore();
    const pathname = usePathname();
    const query = useSearchParams();

    const onClickGoMain = () => {
        router.push("/");
        store.resetSelectProcess();
    }
    const onClickGoHistory = () => {
        router.push("/history");
    }
    const onClickGoBackPage = () => {
        router.back();
    }
    const goMainPage = () => {
        router.push('/');
        store.resetSelectProcess();
        uiStore.closeModal();
    }
    const onClickClose = () => {
        uiStore.setModalState({
            title: '글 제안받기를 중단하시겠어요?',
            contents: '지금 중단하면 되돌릴 수 없어요\n그래도 중단하시겠어요?',
            onConfirm: goMainPage,
            onCancel: uiStore.closeModal,
        });
        uiStore.openModal();
    }
    const onClickGoPrevPage = () => {
        router.back();
    }
    const onClickSearch = () => {
        window.alert('준비 중입니다')
        // router.push(PATH.template_search);
    }

    const mainPageHeader = () => {
        return (
            <div className={styles['container-transparent']}>
                {store.nickname ?
                    <Image
                        onClick={onClickGoHistory}
                        src="/icon/chat.png"
                        width={24}
                        height={24}
                        alt="chat-icon"
                        className="cp"
                    /> : <div style={{width: '24px'}}></div>}
                <div>
                    {store.nickname ?
                        <Image
                            src={store.profile ? store.profile : '/icon/profile_loggedin.png'}
                            width={28}
                            height={28}
                            alt="profile-icon"
                            className="cp"
                            style={{borderRadius: '50%'}}
                            onClick={() => router.push('/profile')}
                        /> :
                        <Image
                            src="/icon/profile_loggedout.png"
                            width={28}
                            height={28}
                            alt="profile-icon"
                            className="cp"
                            onClick={() => router.push('/profile')}
                        />
                    }
                </div>
            </div>
        )
    }
    const suggestionPageHeader = () => {
        return (
            <>
                {!uiStore.isSuggestionLoading &&
                    <div className={styles['container-white']}
                         style={{backgroundColor: pathname === PATH.analyze_view_results ? 'transparent' : ''}}>
                        <Image
                            src="/icon/arrow_back.png"
                            width={24}
                            height={24}
                            alt="arrow-icon"
                            className="cp"
                            onClick={onClickGoPrevPage}
                        />
                        { query.get('history') !== 'true' &&
                        <Image
                            src="/icon/close.png"
                            width={24}
                            height={24}
                            alt="close-icon"
                            className="cp"
                            onClick={onClickClose}
                        />}
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
                {isClose ?
                    <Image
                        src="/icon/close.png"
                        width={24}
                        height={24}
                        alt="close-icon"
                        className="cp"
                        onClick={onClickClose}
                    /> : <div style={{width: '24px'}}></div>}
            </div>)
    }
    const templateHeaderBg = () => {
        if (pathname === '/template') {
            return '#FFF1DF';
        } else if (pathname.includes('/template/')) {
            return '#FFF9F2';
        }
    }
    const templateHeader = () => {
        return (
            <div className={styles['container-transparent']}
                 style={{backgroundColor: templateHeaderBg()}}>
                <Image
                    src="/icon/arrow_back.png"
                    width={24}
                    height={24}
                    alt="arrow-icon"
                    className="cp"
                    onClick={pathname === '/template' ? onClickGoMain : onClickGoBackPage}
                />
                <div className="gr-90 body-2 weight-600">템플릿</div>
                {pathname === '/template' ?
                    <Image
                        src="/icon/search.png"
                        width={22}
                        height={22}
                        alt="search-icon"
                        className="cp"
                        onClick={onClickSearch}
                    /> : <div style={{width: '22px'}}></div>}
            </div>)
    }
    const historyHeader = () => {
        return (
            <div className={styles['container-white']}>
                <Image
                    src="/icon/arrow_back.png"
                    width={24}
                    height={24}
                    alt="arrow-icon"
                    className="cp"
                    onClick={onClickGoMain}
                />
                <div className="gr-90 body-2 weight-600">대화내역</div>
                <div style={{width: '24px', height: '24px'}}/>
            </div>)
    }
    // const descriptionHeader = () => {
    //     return (
    //         <div className={styles['container-white']}>
    //             <Image
    //                 src="/icon/arrow_back.png"
    //                 width={24}
    //                 height={24}
    //                 alt="arrow-icon"
    //                 className="cp"
    //                 onClick={() => uiStore.setDescriptionShow(false)}
    //             />
    //             <div className="gr-90 body-2 weight-600">글 제안이란?</div>
    //             <div style={{width: '24px', height: '24px'}}/>
    //         </div>)
    // }

    return (
        <div className={styles.wrapper}>
            {pathname === '/' && mainPageHeader()}
            {pathname.includes('/suggestion') && suggestionPageHeader()}
            {pathname === '/profile' && goBackCloseTitleHeader('프로필', false)}
            {pathname === '/history' && historyHeader()}
            {pathname.includes('/template') && templateHeader()}
        </div>
    );
}

export default Header;