'use client'
import React, {useEffect, useState} from 'react';
import Header from "@/src/components/header/Header";
import styles from './page.module.css'
import {usePathname} from "next/navigation";
import {getUserTemplateDetail} from "@/src/api/template";
import Tag from "@/src/components/tag/Tag";
import {MyTemplate} from "@/src/type/template";
import Image from "next/image";
import Toast from "@/src/components/toast/Toast";
import TagsEdit from "@/src/app/template/_components/TagsEdit";
import BottomDrawer from "@/src/components/bottom-drawer/BottomDrawer";

function TemplateDetail() {
    // TODO toast 알림 공동화
    const pathname = usePathname();
    const [pageData, setPageData] = useState<MyTemplate>();
    const [toastShow, setToastShow] = useState<boolean>(false);
    const [editTag, setEditTag] = useState<boolean>(false);
    useEffect(() => {
        getUserTemplateDetail(pathname.split('/')[2])
            .then((response) => {
                setPageData(response);
            })
    }, [pathname]);
    const copyText = (id: string) => {
        const contents = document.getElementById(id);
        try {
            if (contents) {
                navigator.clipboard.writeText(contents.innerText);
                setToastShow(true);
            }
        } catch (e) {
            console.log(e, '복사 실패');
        }
    }

    const editTags = () => {
        setEditTag(true);
    }

    const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
    const onClickTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            const index = selectedTags.indexOf(tag);
            selectedTags.splice(index, 1);
            setSelectedTags([...selectedTags]);
        } else if (selectedTags.length < 2) {
            setSelectedTags((prev) => [...prev, tag]);
        } else {
            setToastShow(true);
        }
    }
    return (
        <>
            <div className={styles['wrapper']}>
                <Header/>
                <div className={styles['container']}>
                    <div className={styles['tags-area']}>
                        <div className={styles['tags--wrapper']}>
                            {pageData && pageData.tags.map((tag, index) => (
                                <div key={index}>
                                    <Tag text={tag} type="squared"/>
                                </div>
                            ))}
                        </div>
                        <div className={styles['edit-button']} onClick={editTags}>수정</div>
                    </div>
                    <div id="contents" className={styles['text--wrapper']}>
                        {pageData && pageData.suggestion}
                    </div>
                    <div className={styles['paste-button--wrapper']}>
                        <div className={styles['paste-button']} onClick={() => {
                            copyText('contents')
                        }}>
                            <Image src='/icon/copy_text_og.png' alt='icon' width={20} height={20}/>
                            복사하기
                        </div>
                    </div>
                    {toastShow &&
                        <div className={styles['toast--wrap']}>
                            <Toast>복사되었습니다.</Toast>
                        </div>}
                </div>
            </div>
            {editTag &&
                <BottomDrawer title="태그 편집" onClose={() => setEditTag(false)}>
                    <TagsEdit onClickTag={onClickTag} selectedTags={selectedTags} align="flex-start"/>
                </BottomDrawer>
            }
        </>
    );
}

export default TemplateDetail;