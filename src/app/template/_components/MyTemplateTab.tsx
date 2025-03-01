import React from 'react';
import styles from "./TemplateTabs.module.css";
import {dateTimeFormat} from "@/src/util/convert";
import Tag from "@/src/components/tag/Tag";
import {MyTemplate, MyTemplateArray} from "@/src/type/template";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {useBoundStore} from "@/src/store/stores";

interface MyTemplateTabProps {
    data: MyTemplateArray;
}

function MyTemplateTab(props: MyTemplateTabProps) {
    const router = useRouter();
    const goTemplateDetail = (id: string) => {
        router.push(`/template/${id}`);
    }
    const goTemplateWrite = () => {
        router.push('/template/write');
    }
    const goLogin = () => {
        router.push('/kakao');
    }
    const store = useBoundStore();
    return (
        <div className={`${styles['templates--wrap']} scrollbar`}>
            {store.nickname ?
                <>
                    {props.data.map((template: MyTemplate) => (
                        <div key={template.id} className={styles['template__list--wrap']}
                             onClick={() => goTemplateDetail(template.id)}>
                            <div className="gr-50 label-2">{dateTimeFormat(template.updated_at)}</div>
                            <div className={styles['template__contents']}>
                                {template.suggestion}
                            </div>
                            <div className={styles['template__tag--wrap']}>
                                {
                                    template.tags.map((tag) => (
                                        <span key={tag}>
                                            <Tag type="squared" text={tag}/>
                                    </span>
                                    ))
                                }
                            </div>
                        </div>
                    ))}
                    <div className={styles['add-button--wrap']}>
                        <Image className={styles['add-button']} onClick={goTemplateWrite}
                               src='/icon/template-add.png' alt='icon' width={60} height={60}/>
                    </div>
                </> :
                <div className={styles['empty-container']}>
                    <div className="gr-95 subtitle-2 weight-600">MY 템플릿은<br/> 로그인 후 이용 가능합니다</div>
                    <Image src='/icon/empty_box.png' alt='icon' width={140} height={150} />
                    <button className={styles['login-button']} onClick={goLogin}>로그인하기</button>
                </div>}
        </div>
    );
}

export default MyTemplateTab;