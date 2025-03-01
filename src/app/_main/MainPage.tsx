import React from 'react';
import Image from "next/image";
import styles from './MainPage.module.css'
import {useBoundStore} from "@/src/store/stores";
import {useRouter} from "next/navigation";

function MainPage () {
    const router = useRouter();
    const store = useBoundStore();
    const goTemplatePage = () => {
        router.push("/template");
    }
    const onClickSuggestButton = () => {
        store.setIsMainPage(false);
    }
    return (
        <div className={styles['main--wrap']}>
            <div className={`${styles['main-middle-section']} scrollbar`}>
                <div className={styles['template-wrap']} onClick={goTemplatePage}>
                    <div className={styles.template}>
                        <div className={styles['template-icons__wrap']}>
                            <div>
                                <Image
                                    src="/icon/main_template.svg"
                                    width={63}
                                    height={63}
                                    alt="logo" />
                            </div>
                            <div>
                                <Image
                                    src="/icon/main_next.png"
                                    width={30}
                                    height={30}
                                    alt="icon-go-next"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="body-2 weight-600 gr-90">글 제안 템플릿</div>
                            <div className="body-3 weight-500 gr-70 mg-top-9">상황별 저장된 글을 쉽고 빠르게 탐색하세요</div>
                        </div>
                    </div>
                </div>
                <div className={styles['logo-area-wrap']}>
                    <div className="title-1 weight-600">어떤 글을 써드릴까요?</div>
                    <div className={styles['logo-area-text-wrap']} style={{color: '#282929'}}>
                        <div className="subtitle-2" style={{color: '#434344'}}>상사에게 보고하는 메일</div>
                        <div className="subtitle-2" style={{color: '#5B5B5C'}}>어른께 안부 인사</div>
                        <div className="body-1" style={{color: '#727479'}}>정중하게 부탁 거절</div>
                        <div className="body-2" style={{color: '#8D8F95'}}>진심 담긴 위로 한마디</div>
                    </div>
                </div>
            </div>
            { store.isMainPage &&
                <div className={styles['select-start__button']} onClick={onClickSuggestButton}>
                    <div className={styles['btn-state__wrap']}>
                        <Image
                            src="/icon/arrow_top.png"
                            width={15}
                            height={15}
                            alt="arrow-icon"
                            className={styles['btn-up']}
                        />
                        <div className={styles['btn-state__text__wrap']}>
                            <Image
                                src="/icon/pencil.png"
                                width={28}
                                height={28}
                                alt="pencil-icon"
                            />
                            <div className="body-1 weight-600">글 제안받기</div>
                        </div>
                    </div>
                </div>}
        </div>
    );
}

export default MainPage;