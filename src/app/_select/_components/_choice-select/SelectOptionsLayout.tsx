import React, {useEffect, useRef, useState} from 'react';
import styles from './SelectOptionsLayout.module.css'
import ProgressBar from "@/src/components/progress-bar/ProgressBar";
import {useBoundStore} from "@/src/store/stores";
import {PURPOSE, SITUATIONS, TONES} from "@/src/enum/options";
import PlainButton from "@/src/components/button/PlainButton";
import BottomDrawer from "@/src/components/bottom-drawer/BottomDrawer";
import NumberCountTextarea from "@/src/components/input/NumberCountTextarea";
import WriteDetail from "@/src/app/_select/_components/WriteDetail";

function SelectOptionsLayout() {
    const store = useBoundStore();
    const [optionList, setOptionList] = useState<Array<string>>([]);
    const [selectedOption, setSelectedOption] = useState<string>('');

    useEffect(() => {
        setSelectedOption('');
        if (store.optionsSelectSteps < 3) {
            let options;
            switch (store.optionsSelectSteps) {
                case 0:
                    options = JSON.parse(JSON.stringify(SITUATIONS));
                    break;
                case 1:
                    options = JSON.parse(JSON.stringify(TONES));
                    break;
                case 2:
                    options = JSON.parse(JSON.stringify(PURPOSE));
                    break;
            }
            setOptionList([...options, '+ 직접입력']);
        }
    }, [store.optionsSelectSteps])
    const pageTitleText = () => {
        let title = '';
        let description = '';
        switch (store.optionsSelectSteps) {
            case 0:
                title = '상황을 선택해주세요';
                description = '선택한 상황에 맞게 글을 제안해드려요';
                break;
            case 1:
                title = '말투를 선택해주세요';
                description = '선택한 말투로 글을 제안해드려요';
                break;
            case 2:
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

    const onClickNextButton = () => {
        let key;
        switch (store.optionsSelectSteps) {
            case 0:
                key = 'situation';
                break;
            case 1:
                key = 'tone';
                break;
            case 2:
                key = 'usage';
                break;
        }
        if (store.optionsSelectSteps !== 3) {
            store.setOptionsSelectSteps(store.optionsSelectSteps + 1);
            const newValue = {...store.selectedOptionsSet, [`${key}`]: selectedOption}
            store.setSelectedOptions(newValue);
        } else {
            if (!store.selectedOptionsSet.detail) {
                store.setSelectedOptions({...store.selectedOptionsSet, detail: ''});
            }
            store.goNextStep();
            store.goNextStep();
            store.goNextStep();
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
                    <ProgressBar step={store.optionsSelectSteps}/>
                    <div className={styles['contents--wrap']}>
                        {store.optionsSelectSteps < 3 &&
                            <>
                                <div className="gr-95 title-2 weight-600">
                                    {pageTitleText().title}&nbsp;
                                    {store.optionsSelectSteps === 0 && <span style={{color: '#FF1F00'}}>*</span>}
                                </div>
                                <div className="gr-70 body-2 weight-600 mg-top-14">
                                    {pageTitleText().description}
                                </div>
                            </>}
                        {store.optionsSelectSteps < 3 ?
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
                                 disabled={store.optionsSelectSteps === 0 && selectedOption === ''}>
                        다음
                    </PlainButton>
                </div>
            </div>
            <div>
            {drawerShow &&
                <BottomDrawer title="직접 입력" onClose={onCloseDrawer}>
                    <NumberCountTextarea propsFontSize={'14px'} inputRef={optionRef} onChangeInput={onChangeOptionRef}/>
                </BottomDrawer>
            }
            </div>
        </>
    );
}

export default SelectOptionsLayout;