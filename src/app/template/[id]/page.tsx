'use client'
import React, {useEffect, useRef, useState} from 'react';
import Header from "@/src/components/header/Header";
import styles from './page.module.css'
import {usePathname, useRouter} from "next/navigation";
import {deleteUserTemplateDetail, editUserTemplateDetail, getUserTemplateDetail} from "@/src/api/template";
import Tag from "@/src/components/tag/Tag";
import {MyTemplate} from "@/src/type/template";
import Image from "next/image";
import Toast from "@/src/components/toast/Toast";
import TagsEdit from "@/src/app/template/_components/TagsEdit";
import BottomDrawer from "@/src/components/bottom-drawer/BottomDrawer";
import useTagManage from "@/src/hook/useTag";
import {useUiStore} from "@/src/store/ui-store";
import PlainTextarea from "@/src/components/input/PlainTextarea";
import PlainButton from "@/src/components/button/PlainButton";
import LayoutWrapper from "@/src/app/LayoutWrapper";
import useModalManage from "@/src/hook/useModal";

function TemplateDetail() {
    // TODO toast 알림 공동화
    const pathname = usePathname();
    const [pageData, setPageData] = useState<MyTemplate>();
    const [toastShow, setToastShow] = useState<boolean>(false);

    const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
    const [pageTags, setPageTags] = useState<Array<string>>([]);
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

    const [menuShow, setMenuShow] = useState(false);
    const useTag = useTagManage({tags: selectedTags, setTags: setSelectedTags});

    const [editMode, setEditMode] = useState('');
    const onClickMenuButton = () => {
        setMenuShow(!menuShow);
        setEditMode('');
    }
    const router = useRouter();
    const onClickDeleteConfirm = () => {
        setEditMode('');
        setMenuShow(false);
        uiStore.closeModal();
        deleteUserTemplateDetail(pathname.split('/')[2]).then(() => {
            router.back();
        });
    }
    const useModal = useModalManage({
        onConfirmAction: onClickDeleteConfirm,
        onCancelAction: onClickDeleteConfirm,
        type: 'delete-confirm',
    })
    const onClickHamburger = (button: string) => {
        setEditMode(button);
        if (button === 'edit') {
            setMenuShow(false);
        } else {
            // 삭제하기 > 삭제 진행여부 재확인 모달 오픈
            useModal.openModal();
        }
    }

    const onClickTagEdit = () => {
        uiStore.setTagEditShow(true);
    }
    const uiStore = useUiStore();
    const onSaveTags = () => {
        const arr = JSON.parse(JSON.stringify(selectedTags));
        setPageTags(arr);

        const params = {
            'suggestion_id': pathname.split('/')[2],
            tags: arr,
        }
        editUserTemplateDetail(params).then(() => {
            // TODO 저장완료 안내 토스트 알림
        })
    }
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (inputRef.current) {
            inputRef.current.value = e.target.value ? e.target.value : '';
        }
    }
    useEffect(() => {
        if (inputRef.current && pageData?.suggestion) {
            inputRef.current.value = pageData?.suggestion
        }
    }, [pageData]);

    return (
        <LayoutWrapper>
            <div className={styles['wrapper']}>
                <Header/>
                <div className={styles['container']}>
                    <div>
                        <div className={styles['tags-area']}>
                            <div className={styles['tags--wrapper']}>
                                {pageTags && pageTags.map((tag, index) => (
                                    <div key={index}>
                                        <Tag text={tag} type="squared"/>
                                    </div>
                                ))}
                                <button className={styles['edit-tag__button']} onClick={onClickTagEdit}>
                                    수정
                                </button>
                            </div>
                            {editMode === '' &&
                            <Image src="/icon/hamburger.png" alt="menu-button"
                                   onClick={onClickMenuButton}
                                   className={styles['hamburger-button']} width={22} height={22}/>}
                            {menuShow &&
                                <div className={styles['hamburger--wrap']}>
                                    <div className={styles['hamburger-tab']} onClick={() => {
                                        onClickHamburger('edit')
                                    }}>
                                        {editMode === 'edit' ?
                                            <Image src="/icon/check_hamburger.png" alt="" className="cp" width={18}
                                                   height={18}/>
                                            : <div style={{width: '18px', height: '18px'}}></div>}
                                        <div style={{color: editMode === 'edit' ? '#0C0C0D' : ''}}>글 수정하기</div>
                                    </div>
                                    <hr/>
                                    <div className={styles['hamburger-tab']} onClick={() => {
                                        onClickHamburger('delete')
                                    }}>
                                        {editMode === 'delete' ?
                                            <Image src="/icon/check_hamburger.png" alt="" className="cp" width={18}
                                                   height={18}/>
                                            : <div style={{width: '18px', height: '18px'}}></div>}
                                        <div style={{color: editMode === 'delete' ? '#0C0C0D' : ''}}>글 삭제하기</div>
                                    </div>
                                </div>}
                        </div>
                        <div id="contents" className={styles['text--wrapper']}>
                            <PlainTextarea disabled={editMode !== 'edit'} transparent={true} onChangeInput={onChange}
                                           inputRef={inputRef}/>
                        </div>
                        {editMode === '' &&
                            <div className={styles['paste-button--wrapper']}>
                                <div className={styles['paste-button']} onClick={() => {
                                    copyText('contents')
                                }}>
                                    <Image src='/icon/copy_text_og.png' alt='icon' width={20} height={20}/>
                                    복사하기
                                </div>
                            </div>}
                        {toastShow &&
                            <div className={styles['toast--wrap']}>
                                <Toast>복사되었습니다.</Toast>
                            </div>}
                    </div>
                </div>
                {editMode === 'edit' &&
                    <div className={styles['save-edit__button']}>
                        <PlainButton>수정하기</PlainButton>
                    </div>}
            </div>
            {
                uiStore.tagEditShow &&
                <BottomDrawer title='태그 편집' onClose={useTag.onCloseTagEdit} onCloseAction={onSaveTags}>
                    <TagsEdit align="flex-start" selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>
                </BottomDrawer>
            }
        </LayoutWrapper>
    );
}

export default TemplateDetail;