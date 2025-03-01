import React from 'react';
import styles from "./TemplateTabs.module.css";
import {dateTimeFormat} from "@/src/util/convert";
import Tag from "@/src/components/tag/Tag";
import {MyTemplate, MyTemplateArray} from "@/src/type/template";
import {useRouter} from "next/navigation";
import Image from "next/image";

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
    return (
        <div className={`${styles['templates--wrap']} scrollbar`}>
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
                       src='/icon/template-add.png' alt='icon' width={60} height={60} />
            </div>
        </div>
    );
}

export default MyTemplateTab;