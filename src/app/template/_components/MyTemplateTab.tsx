import React from 'react';
import styles from "./TemplateTabs.module.css";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {useBoundStore} from "@/src/store/stores";
import {loginKaKao} from "@/src/api/auth";
import {TemplateDetailType, TemplateDetailTypeArray} from "@/src/type/template";
import MyTemplateCard from "@/src/app/template/_components/MyTemplateCard";

interface MyTemplateTabProps {
    data: TemplateDetailTypeArray;
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
        loginKaKao();
    }
    const store = useBoundStore();
    return (
        <div className={`${styles['templates--wrap']} scrollbar`}>
            {store.nickname ?
                <>
                    {props.data.map((template: TemplateDetailType) => (
                        <div key={template.id} onClick={() => goTemplateDetail(template.id)}>
                            <MyTemplateCard data={template} keyword={''} />
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