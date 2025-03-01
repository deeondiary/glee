'use client'
import React, {useEffect, useRef, useState} from 'react';
import styles from './page.module.css'
import {usePathname, useRouter} from "next/navigation";
import {deleteUserTemplateDetail, editUserTemplateDetail, getUserTemplateDetail} from "@/src/api/template";
import Tag from "@/src/components/tag/Tag";
import Image from "next/image";
import {useUiStore} from "@/src/store/ui-store";
import PlainTextarea from "@/src/components/input/PlainTextarea";
import PlainButton from "@/src/components/button/PlainButton";
import LayoutWrapper from "@/src/app/LayoutWrapper";
import useModalManage from "@/src/hook/useModal";
import {TemplateDetailType} from "@/src/type/template";

function TemplateDetail() {
    const uiStore = useUiStore();

    const pathname = usePathname();
    const [pageData, setPageData] = useState<TemplateDetailType>();

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
                uiStore.setToastText('복사되었습니다.')
                uiStore.setToastShow(true);
            }
        } catch (e) {
            console.log(e, '복사 실패');
        }
    }

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
            // here
            // const node = document.getElementById('text-area')
            // console.log(node, 'node')
            // node.focus();
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
            title: '',
            suggestion: inputRef.current && inputRef.current.value ? inputRef.current.value : '',
            tags: arr,
        }
        editUserTemplateDetail(pathname.split('/')[2], params).then(() => {
            if (toastShow) {
                uiStore.setToastText('수정되었습니다.');
                uiStore.setToastShow(true);
            }
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
        <LayoutWrapper tags={selectedTags} setTags={setSelectedTags} onCloseTagDrawer={() => saveData(false)}>
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
                                    <button className={styles['edit-tag__button']} onClick={onClickTagEdit}>
                                        수정
                                    </button>
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
                            <PlainTextarea disabled={editMode !== 'edit'} transparent={true} onChangeInput={onChange}
                                           inputRef={inputRef} fontColor="#282929"/>
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