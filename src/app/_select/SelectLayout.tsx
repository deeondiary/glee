import React, {useState} from 'react';
import styles from './select.module.css'
import Image from "next/image";
import PlainButton from "@/src/components/button/PlainButton";
import Modal from "@/src/components/modal/Modal";
import SelectIfImage from "@/src/app/_select/components/SelectIfImage";
import {useBoundStore} from "@/src/store/stores";
import SelectUploadImage from "@/src/app/_select/components/SelectUploadImage";
import SelectUploadImageResult from "@/src/app/_select/components/SelectUploadImageResult";

interface SelectLayoutProps {
    show: boolean;
    setShow: (show: boolean) => void;
}

function SelectLayout(props: SelectLayoutProps) {
    const store = useBoundStore();
    const [warningShow, setWarningShow] = useState(false);
    const onClickGoBack = () => {
        if (store.currentStep === 0) {
            setWarningShow(true);
        } else {
            store.goBackStep();
        }
    }
    const onCancelModal = () => {
        setWarningShow(false);
    }
    const onConfirmModal = () => {
        setWarningShow(false);
        props.setShow(false);
        store.resetAll()
    }
    const onClickNextHandler = () => {
        // const step = store.currentStep;
        store.goNextStep();
    }
    return (
        <div>
            {props.show ?
                <div className={styles['page-wrapper']}>
                    <div>
                        <div className={styles.header}>
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
                                onClick={() => setWarningShow(true)}
                            />
                        </div>
                        <div className="scrollbar">
                            {store.currentStep === 0 &&
                                <div>
                                    <SelectIfImage/>
                                </div>}
                            {(store.currentStep === 1 && store.selectChoice === 'image') &&
                                <div>
                                    <SelectUploadImage/>
                                </div>}
                            {(store.currentStep === 2) &&
                                <div>
                                    <SelectUploadImageResult/>
                                </div>}
                        </div>
                    </div>
                    <div className={styles['bottom-button--wrap']}>
                        <PlainButton disabled={store.currentStep === 0 && store.selectChoice === null}
                                     onClick={onClickNextHandler}>
                            다음
                        </PlainButton>
                    </div>
                </div> :
                /**/
                <div className={styles['btn-state__wrap']}
                     onClick={() => props.setShow(true)}>
                    <Image
                        src="/icon/arrow_top.png"
                        width={15}
                        height={15}
                        alt="arrow-icon"
                        className="cp"
                    />
                    <div className={styles['btn-state__text__wrap']}>
                        <div style={{height: '18px', width: '18px', backgroundColor: 'white'}}>
                        </div>
                        <div className="body-1 weight-600">글 제안받기</div>
                    </div>
                </div>
            }
            {
                warningShow &&
                <Modal
                    title="글 제안받기를 중단하시겠어요?" contents={"지금 중단하면 되돌릴 수 없어요.\n그래도 중단하시겠어요?"}
                    onCancel={onCancelModal} onConfirm={onConfirmModal}
                />
            }
        </div>
    );
}

export default SelectLayout;