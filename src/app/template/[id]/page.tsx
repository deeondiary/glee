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
    const [pageTags, setPageTags] = useState<Array<string>>([]);
    const [toastShow, setToastShow] = useState<boolean>(false);
    const [editTag, setEditTag] = useState<boolean>(false);
    useEffect(() => {
        getUserTemplateDetail(pathname.split('/')[2])
            .then((response) => {
                setPageData(response);
                setPageTags(response.tags);
                const arr: Array<string> = [];
                response.tags.forEach((r: string) => arr.push(r));
                setSelectedTags(arr)
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

    const [menuShow, setMenuShow] = useState(false);
    const [editMode, setEditMode] = useState('');
    const onClickMenuButton = () => {
        setMenuShow(!menuShow);
        setEditMode('');
    }
    const onClickEdit = (button: string) => {
        setEditMode(button);
        if (button === 'edit') {
            setEditTag(true);
        } else {
            // 삭제하기
            // TODO 삭제 api호출
            setEditTag(false);
            setEditMode('');
        }
    }
    const onCloseEditMode = () => {
        setEditTag(false);
        setEditMode('');
        setPageTags(selectedTags);
        setMenuShow(false);
        // TODO 태그 저장 api호출
    }

    return (
        <>
            <div className={styles['wrapper']}>
                <Header/>
                <div className={styles['container']}>
                    <div className={styles['tags-area']}>
                        <div className={styles['tags--wrapper']}>
                            {pageTags && pageTags.map((tag, index) => (
                                <div key={index}>
                                    <Tag text={tag} type="squared"/>
                                </div>
                            ))}
                        </div>
                        <Image src="/icon/hamburger.png" alt="menu-button"
                               onClick={onClickMenuButton}
                               className={styles['hamburger-button']} width={22} height={22}/>
                        { menuShow &&
                        <div className={styles['hamburger--wrap']}>
                            <div className={styles['hamburger-tab']} onClick={() => {onClickEdit('edit')}}>
                                { editMode === 'edit' ?
                                <Image src="/icon/check_hamburger.png" alt="" className="cp" width={18} height={18}/>
                                    : <div style={{width: '18px', height: '18px'}}></div>}
                                <div style={{color: editMode === 'edit' ? '#0C0C0D' : ''}}>수정하기</div>
                            </div>
                            <hr/>
                            <div className={styles['hamburger-tab']} onClick={() => {onClickEdit('delete')}}>
                                { editMode === 'delete' ?
                                    <Image src="/icon/check_hamburger.png" alt="" className="cp" width={18} height={18}/>
                                    : <div style={{width: '18px', height: '18px'}}></div>}
                                <div style={{color: editMode === 'delete' ? '#0C0C0D' : ''}}>삭제하기</div>
                            </div>
                        </div> }
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
                <BottomDrawer title="태그 편집" onClose={onCloseEditMode}>
                    <TagsEdit onClickTag={onClickTag} selectedTags={selectedTags} align="flex-start"/>
                </BottomDrawer>
            }
        </>
    );
}

export default TemplateDetail;