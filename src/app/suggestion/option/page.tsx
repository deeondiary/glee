'use client'
import React, {useEffect, useRef, useState} from 'react';
import styles from './page.module.css'
import ProgressBar from "@/src/components/progress-bar/ProgressBar";
import {useBoundStore} from "@/src/store/stores";
import PlainButton from "@/src/components/button/PlainButton";
import BottomDrawer from "@/src/components/bottom-drawer/BottomDrawer";
import NumberCountTextarea from "@/src/components/input/NumberCountTextarea";
import WriteDetail from "@/src/app/suggestion/_component/WriteDetail";
import {usePathname, useRouter} from "next/navigation";
import {OPTIONS} from "@/src/enum/options";
import {postGenerateTemplates} from "@/src/api/select";
import {PATH} from "@/src/enum/path";
import {useUiStore} from "@/src/store/ui-store";
import useModalManage from "@/src/hook/useModal";

/* Step 01 - 2. 옵션 직접 선택
- currentStep : 1
- optionsSelectSteps : 0.상황 (situation)
- optionsSelectSteps : 1.말투 (tone)
- optionsSelectSteps : 2.용도 (usage)
- optionsSelectSteps : 3.디테일 (detail)
 */
function Page() {
    const store = useBoundStore();
    const uiStore = useUiStore();
    const [optionList, setOptionList] = useState<Array<string>>([]);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setSelectedOption('');
        if (pathname.split('/')[3] !== 'detail') {
            const options = JSON.parse(JSON.stringify(OPTIONS[`${pathname.split('/')[3]}`]));
            setOptionList([...options, '+ 직접입력']);
        }
    }, [pathname])
    const pageTitleText = () => {
        const currentPath = pathname.split('/')[3];
        let title = '';
        let description = '';
        switch (currentPath) {
            case 'situation':
                title = '상황을 선택해주세요';
                description = '선택한 상황에 맞게 글을 제안해드려요';
                break;
            case 'tone':
                title = '말투를 선택해주세요';
                description = '선택한 말투로 글을 제안해드려요';
                break;
            case 'usage':
                title = '어디에 쓰이는 글인가요?';
                description = '형식을 설정해주세요';
                break;
        }
        return {title, description};
    }

    const onClickOption = (option: string) => {
        setSelectedOption(option);
        if (option === '+ 직접입력') {
            setDrawerShow(true);
        }
    }
    const [drawerShow, setDrawerShow] = useState(false);
    const onCloseDrawer = () => {
        if (optionRef.current && optionRef.current.value) {
            optionList.splice(-1, 1);
            optionList.push(optionRef.current.value);
            setSelectedOption(optionRef.current.value);
        } else {
            setSelectedOption('');
        }
        setDrawerShow(false);
    }
    const useModal = useModalManage({type: 'server-error'});
    const onClickNextButton = () => {
        const currentPath = pathname.split('/')[3];
        let nextPath = '';
        switch (currentPath) {
            case 'situation':
                nextPath = 'tone';
                break;
            case 'tone':
                nextPath = 'usage';
                break;
            case 'usage':
                nextPath = 'detail';
                break;
        }
        if (currentPath !== 'detail') {
            const newValue = {...store.selectedOptionsSet, [`${currentPath}`]: selectedOption}
            store.setSelectedOptions(newValue);
            router.push(`/suggestion/option/${nextPath}`);
        } else {
            let data = store.selectedOptionsSet;
            if (data.detail === undefined) {
                data = {...data, detail: ''};
                store.setSelectedOptions(data);
            }
            uiStore.setSuggestionLoadingState('analysis');
            uiStore.setIsSuggestionLoading(true);
            postGenerateTemplates(data)
                .then((response) => {
                    if (response.suggestions) {
                        store.setSuggestedTemplates(response.suggestions);
                        router.push(PATH.analyze_view_results);
                        uiStore.setIsSuggestionLoading(false);
                    } else {
                        uiStore.setIsSuggestionLoading(false);
                        useModal.openModal();
                    }
                })
                .catch(() => {
                    uiStore.setIsSuggestionLoading(false);
                    useModal.openModal();
                })
        }
    }

    const detailRef = useRef<HTMLTextAreaElement>(null);
    const onChangeDetailRef = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (detailRef.current) {
            detailRef.current.value = e.target.value;
            const newValue = {...store.selectedOptionsSet, detail: e.target.value}
            store.setSelectedOptions(newValue);
        }
    }
    const optionRef = useRef<HTMLTextAreaElement>(null);
    const onChangeOptionRef = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (optionRef.current) {
            optionRef.current.value = e.target.value;
        }
    }
    return (
        <>
            <div className={styles.container}>
                <div className="mg-top-5 scrollbar">
                    <ProgressBar path={pathname.split('/')[3]}/>
                    <div className={styles['contents--wrap']}>
                        {pathname.split('/')[3] !== 'detail' &&
                            <>
                                <div className="gr-95 title-2 weight-600">
                                    {pageTitleText().title}&nbsp;
                                    {pathname.split('/')[3] === 'situation' && <span style={{color: '#FF1F00'}}>*</span>}
                                </div>
                                <div className="gr-70 body-2 weight-600 mg-top-14">
                                    {pageTitleText().description}
                                </div>
                            </>}
                        {pathname.split('/')[3] !== 'detail' ?
                            <div className={styles['options--wrap']}>
                                {optionList.map((option, index) => (
                                    <div key={index} onClick={() => onClickOption(option)}
                                         className={`${styles['options']} ${selectedOption === option && styles['selected']}`}>
                                        {option}
                                    </div>
                                ))}
                            </div> : <WriteDetail ref={detailRef} onChange={onChangeDetailRef}/>}
                    </div>
                </div>
                <div className={styles['button--wrap']}>
                    <PlainButton onClick={onClickNextButton}
                                 disabled={pathname.split('/')[3] === 'situation' && selectedOption === ''}>
                        다음
                    </PlainButton>
                </div>
            </div>
            <div>
                {drawerShow &&
                    <BottomDrawer title="직접 입력" onClose={onCloseDrawer}>
                        <NumberCountTextarea propsFontSize={'14px'} inputRef={optionRef}
                                             onChangeInput={onChangeOptionRef}/>
                    </BottomDrawer>
                }
            </div>
        </>
    );
}

export default Page;