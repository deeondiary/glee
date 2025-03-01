'use client'
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import styles from './Header.module.css'
import {usePathname, useRouter} from "next/navigation";
import {useBoundStore} from "@/src/store/stores";
import {useUiStore} from "@/src/store/ui-store";

const Header = () => {
    const router = useRouter();
    const store = useBoundStore();
    const uiStore = useUiStore();
    const pathname = usePathname();

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
    const onClickGoBackStep = () => {
        if (store.selectChoice === 'image') {
            // 사진업로드 시
            switch (store.currentStep) {
                case 0:
                    store.setIsMainPage(true);
                    store.setSelectChoice('');
                    break;
                case 3:
                    store.setCurrentStep(1);
                    break;
                case 5:
                    break;
                case 6:
                    store.setCurrentStep(4);
                    break;
                default:
                    store.goBackStep();
                    break;
            }
        } else {
            // 직접 선택 시
            switch (store.currentStep) {
                case 0:
                    store.setIsMainPage(true);
                    store.setSelectChoice('');
                    break;
                case 1:
                    if (store.optionsSelectSteps > 0) {
                        store.setOptionsSelectSteps(store.optionsSelectSteps - 1);
                    } else {
                        store.goBackStep();
                    }
                    break;
                case 6:
                    store.setCurrentStep(1);
                    store.setOptionsSelectSteps(3);
                    break;
                default:
                    if (store.optionsSelectSteps > 0) {
                        store.setOptionsSelectSteps(store.optionsSelectSteps - 1);
                        break;
                    }
            }
        }
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
        window.alert('준비 중 입니다')
    }

    const [iconShow, setIconShow] = useState<boolean>(false);
    useEffect(() => {
        if (store.isMainPage) {
            setIconShow(false);
        } else {
            setTimeout(() => {
                setIconShow(true);
            }, 700);
        }
    }, [store.isMainPage, iconShow]);

    const mainPageHeader = () => {
        return (
            <div className={styles.container}>
                <Image
                    onClick={onClickGoHistory}
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
                            width={28}
                            height={28}
                            alt="profile-icon"
                            className="cp"
                            onClick={() => router.push('/profile')}
                        /> :
                        <Image
                            src="/icon/profile_loggedout.png"
                            width={28}
                            height={28}
                            alt="profile-icon"
                            className="cp"
                            onClick={() => router.push('/kakao')}
                        />
                    }
                </div>
            </div>
        )
    }
    const selectPageHeader = () => {
        return (
            <>
                {(store.currentStep !== 2 && store.currentStep !== 5) &&
                    <>
                        {
                            store.currentStep === 5 &&
                            <div className={styles['container-white']} style={{justifyContent: 'flex-end'}}>
                                <Image
                                    src="/icon/close.png"
                                    width={24}
                                    height={24}
                                    alt="close-icon"
                                    className="cp"
                                    onClick={onClickClose}
                                />
                            </div>
                        }
                        {
                            (store.currentStep !== 5 && iconShow) &&
                            <div className={styles['container-white']}>
                                <Image
                                    src="/icon/arrow_back.png"
                                    width={24}
                                    height={24}
                                    alt="arrow-icon"
                                    className="cp"
                                    onClick={onClickGoBackStep}
                                />
                                {store.currentStep === 2 &&
                                    <div className="gr-90 body-2 weight-600">글 제안</div>}
                                <Image
                                    src="/icon/close.png"
                                    width={24}
                                    height={24}
                                    alt="close-icon"
                                    className="cp"
                                    onClick={onClickClose}
                                />
                            </div>}
                    </>}
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
    const transparentHeader = () => {
        return (
            <div className={styles['container-transparent']}>
                <Image
                    src="/icon/arrow_back.png"
                    width={24}
                    height={24}
                    alt="arrow-icon"
                    className="cp"
                    onClick={onClickGoBackStep}
                />
                <div className="gr-90 body-2 weight-600">글 제안</div>
                <Image
                    src="/icon/close.png"
                    width={24}
                    height={24}
                    alt="close-icon"
                    className="cp"
                    onClick={onClickClose}
                />
            </div>)
    }
    const templateHeader = () => {
        return (
            <div className={styles['container-transparent']}>
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
    const descriptionHeader = () => {
        return (
            <div className={styles['container-white']}>
                <Image
                    src="/icon/arrow_back.png"
                    width={24}
                    height={24}
                    alt="arrow-icon"
                    className="cp"
                    onClick={() => uiStore.setDescriptionShow(false)}
                />
                <div className="gr-90 body-2 weight-600">글 제안이란?</div>
                <div style={{width: '24px', height: '24px'}}/>
            </div>)
    }

    return (
        <div className={styles.wrapper}>
            {
                pathname === '/' &&
                (store.isMainPage ? mainPageHeader() :
                    store.currentStep === 6 ? transparentHeader() :
                        uiStore.descriptionShow ? descriptionHeader() : selectPageHeader())
            }
            {pathname === '/kakao' && onlyGoBackHeader()}
            {pathname === '/profile' && goBackCloseTitleHeader('프로필', false)}
            {pathname === '/history' && historyHeader()}
            {pathname.includes('/template') && templateHeader()}
        </div>
    );
}

export default Header;