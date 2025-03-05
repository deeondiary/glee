import React, {useEffect, useState} from 'react';
import Image from "next/image";
import styles from './ProgressBar.module.css'

function ProgressBar(props: {path: string}) {
    /* 프로그레스바 스타일링 관리
    * current : 현재 페이지 (숫자)
    * finished : 끝난 페이지 (체크)
    * standby : 대기 페이지 (배경 only)
    * */
    const [stepOneState, setStepOneState] = useState<string>('current');
    const [stepTwoState, setStepTwoState] = useState<string>('standby');
    const [stepThreeState, setStepThreeState] = useState<string>('standby');
    const [stepFourState, setStepFourState] = useState<string>('standby');
    useEffect(() => {
        if (props.path === 'situation') {
            setStepOneState('current');
            setStepTwoState('standby');
            setStepThreeState('standby');
            setStepFourState('standby');
        } else if (props.path === 'tone') {
            setStepOneState('finished');
            setStepTwoState('current');
            setStepThreeState('standby');
            setStepFourState('standby');
        } else if (props.path === 'usage') {
            setStepOneState('finished');
            setStepTwoState('finished');
            setStepThreeState('current');
            setStepFourState('standby');
        }  else if (props.path === 'detail') {
            setStepOneState('finished');
            setStepTwoState('finished');
            setStepThreeState('finished');
            setStepFourState('current');
        }
    }, [props.path]);
    return (
        <div className={styles['progress-bar']}>
            <div className={styles[`progress-${stepOneState}`]}>
                {stepOneState === 'current' &&
                    <span className="body-1 weight-600 ft-white">1</span>
                }
                {stepOneState === 'finished' &&
                    <Image
                        src="/icon/check.png"
                        width={16}
                        height={16}
                        alt="check-icon"
                    />
                }
            </div>
            <hr className={styles['divider']}></hr>
            <div className={styles[`progress-${stepTwoState}`]}>
                {stepTwoState === 'current' &&
                    <span className="body-1 weight-600 ft-white">2</span>
                }
                {stepTwoState === 'finished' &&
                    <Image
                        src="/icon/check.png"
                        width={16}
                        height={16}
                        alt="check-icon"
                    />
                }
            </div>
            <hr className={styles['divider']}></hr>
            <div className={styles[`progress-${stepThreeState}`]}>
                {stepThreeState === 'current' &&
                    <span className="body-1 weight-600 ft-white">3</span>
                }
                {stepThreeState === 'finished' &&
                    <Image
                        src="/icon/check.png"
                        width={16}
                        height={16}
                        alt="check-icon"
                    />
                }
            </div>
            <hr className={styles['divider']}></hr>
            <div className={styles[`progress-${stepFourState}`]}>
                {stepFourState === 'current' &&
                    <span className="body-1 weight-600 ft-white">4</span>
                }
                {stepFourState === 'finished' &&
                    <Image
                        src="/icon/check.png"
                        width={16}
                        height={16}
                        alt="check-icon"
                    />
                }
            </div>
        </div>
    );
}

export default ProgressBar;