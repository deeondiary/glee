'use client'
import React, {useEffect, useState} from 'react';
import styles from './page.module.css'
import {usePathname, useRouter} from "next/navigation";
import {deleteUserTemplateDetail, editUserTemplateDetail, getUserTemplateDetail} from "@/src/api/template";
import Tag from "@/src/components/tag/Tag";
import Image from "next/image";
import {useUiStore} from "@/src/store/ui-store";
import PlainButton from "@/src/components/button/PlainButton";
import LayoutWrapper from "@/src/app/LayoutWrapper";
import useModalManage from "@/src/hook/useModal";
import {copyTextUtil} from "@/src/util/utils";
import TextInput from "@/src/components/input/TextInput";
import Textarea from "@/src/components/input/Textarea";

function TemplateDetail() {
    const uiStore = useUiStore();
    const pathname = usePathname();
    const [title, setTitle] = useState('');
    const [suggestion, setSuggestion] = useState('');

    const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
    const [pageTags, setPageTags] = useState<Array<string>>([]);
    const onSaveTags = () => {
        const arr = JSON.parse(JSON.stringify(selectedTags));
        setPageTags(arr);
    }
    useEffect(() => {
        getUserTemplateDetail(pathname.split('/')[2])
            .then((response) => {
                setTitle(response.title);
                setSuggestion(response.suggestion);
                setPageTags(response.tags);
                const arr: Array<string> = [];
                response.tags.forEach((r: string) => arr.push(r));
                setSelectedTags(arr)
            })
    }, [pathname]);

    const [menuShow, setMenuShow] = useState(false);

    const [editMode, setEditMode] = useState('');
    const onClickMenuButton = () => {
        setMenuShow(!menuShow);
        setEditMode('');
    }
    const router = useRouter();
    const onClickCancelDelete = () => {
        setEditMode('');
        setMenuShow(false);
        uiStore.closeModal();
    }
    const onClickDeleteConfirm = () => {
        setEditMode('');
        setMenuShow(false);
        uiStore.closeModal();
        deleteUserTemplateDetail(pathname.split('/')[2]).then(() => {
            uiStore.setToastText('삭제되었습니다.');
            uiStore.setToastShow(true);
            router.back();
        });
    }
    const useModal = useModalManage({
        onConfirmAction: onClickDeleteConfirm,
        onCancelAction: onClickCancelDelete,
        type: 'delete-confirm',
    })
    const onClickHamburger = (button: string) => {
        setEditMode(button);
        if (button === 'edit') {
            setMenuShow(false);
            setTimeout(function() {
                document.getElementById("text-area")?.focus();
            }, 0);
        } else {
            // 삭제하기 > 삭제 진행여부 재확인 모달 오픈
            useModal.openModal();
        }
    }

    const onClickTagEdit = () => {
        uiStore.setTagEditShow(true);
    }

    const saveData = (toastShow: boolean) => {
        const arr = JSON.parse(JSON.stringify(selectedTags));
        setPageTags(arr);
        const params = {
            title: title,
            suggestion: suggestion,
            tags: arr,
        }
        editUserTemplateDetail(pathname.split('/')[2], params).then(() => {
            if (toastShow) {
                uiStore.setToastText('수정되었습니다.');
                uiStore.setToastShow(true);
                setEditMode('');
            }
        })
    }

    return (
        <LayoutWrapper tags={selectedTags} setTags={setSelectedTags} onCloseTagDrawer={onSaveTags}>
            <div className={styles['wrapper']}>
                <div className={styles['container']}>
                    <div>
                        <div className={styles['tags-area--wrap']}>
                            <div className={styles['tags-area']}>
                                <div className={styles['tags--wrapper']}>
                                    {pageTags && pageTags.map((tag, index) => (
                                        <div key={index}>
                                            <Tag text={tag} type="squared"/>
                                        </div>
                                    ))}
                                    {editMode === 'edit' &&
                                    <button className={styles['edit-tag__button']} onClick={onClickTagEdit}>
                                        수정
                                    </button>}
                                </div>
                                {editMode === '' &&
                                    <div>
                                        <Image src="/icon/hamburger.png" alt="menu-button"
                                               onClick={onClickMenuButton}
                                               className="cp" width={22} height={22}/>
                                    </div>}
                            </div>
                        </div>
                        <div className={styles['hamburger-menu--wrap']}>
                            {menuShow &&
                                <div className={styles['hamburger-menu--container']}>
                                    <div className={styles['hamburger-menu']}>
                                        <div className={styles['hamburger-tab']} onClick={() => {
                                            onClickHamburger('edit')
                                        }}>
                                            {editMode === 'edit' ?
                                                <Image src="/icon/check_hamburger.png" alt="" className="cp"
                                                       width={18}
                                                       height={18}/>
                                                : <div style={{width: '18px', height: '18px'}}></div>}
                                            <div style={{color: editMode === 'edit' ? '#0C0C0D' : ''}}>글 수정하기</div>
                                        </div>
                                        <hr/>
                                        <div className={styles['hamburger-tab']} onClick={() => {
                                            onClickHamburger('delete')
                                        }}>
                                            {editMode === 'delete' ?
                                                <Image src="/icon/check_hamburger.png" alt="" className="cp"
                                                       width={18}
                                                       height={18}/>
                                                : <div style={{width: '18px', height: '18px'}}></div>}
                                            <div style={{color: editMode === 'delete' ? '#0C0C0D' : ''}}>글 삭제하기
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                        </div>
                        <div id="contents" className={styles['text--wrapper']}>
                            <div className="mg-bottom-10">
                                <TextInput disabled={editMode !== 'edit'}
                                           bdColor="#E6E6E6" backColor="#FCFCFC"
                                           value={title} setValue={setTitle} />
                            </div>
                            <Textarea disabled={editMode !== 'edit'} bdColor="#E6E6E6" backColor="#FCFCFC"
                                      value={suggestion} setValue={setSuggestion} height={'320px'}/>
                        </div>
                        {editMode === '' &&
                            <div className={styles['paste-button--wrapper']}>
                                <div className={styles['paste-button']} onClick={() => {
                                    copyTextUtil('contents', uiStore)
                                }}>
                                    <Image src='/icon/copy_text_og.png' alt='icon' width={20} height={20}/>
                                    복사하기
                                </div>
                            </div>}
                    </div>
                </div>
                {editMode === 'edit' &&
                    <div className={styles['save-edit__button']}>
                        <PlainButton onClick={() => saveData(true)}>수정하기</PlainButton>
                    </div>}
            </div>
        </LayoutWrapper>
    );
}

export default TemplateDetail;