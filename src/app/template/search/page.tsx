'use client'
import React, {KeyboardEventHandler, useEffect, useState} from 'react';
import styles from './page.module.css'
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useBoundStore} from "@/src/store/stores";
import SearchResult from "@/src/app/template/search/_components/SearchResult";
import {getRecommendedTemplateSearch, getUserTemplateSearch} from "@/src/api/template";
import {TemplateDetailTypeArray, TemplateSearchHistory} from "@/src/type/template";
import useModalManage from "@/src/hook/useModal";
import RecentSearchList from "@/src/app/template/search/_components/RecentSearchList";

function TemplateSearchPage() {
    const router = useRouter();
    const onClickGoBack = () => {
        if (searched) {
            setSearched(false);
        } else {
            router.back();
        }
    }
    const onPressKey: KeyboardEventHandler = (e) => {
        if (e?.code === 'Enter') {
            onClickSearch(searchValue);
        }
    }
    const onFocusInput = () => {
        setSearched(false);
    }
    const useModal = useModalManage({type: 'server-error'});

    const [isMyTemplateFetchError, setIsMyTemplateFetchError] = useState(false);
    const [isRecommendedTemplateFetchError, setIsRecommendedTemplateFetchError] = useState(false);
    const onClickSearch = (searchWord: string) => {
        setSearchValue(searchWord);
        if (searchWord !== '') {
            const newSearchItem = {index: store.recentSearchList.length - 1, item: searchValue}
            store.setRecentSearchList([...store.recentSearchList, newSearchItem])
            getUserTemplateSearch(searchWord)
                .then((response) => {
                    if (response.suggestions) {
                        setSearched(true);
                        setMyTemplateSearchResult(response.suggestions);
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.data.detail === 'No suggestions found') {
                        setSearched(true);
                        setMyTemplateSearchResult([]);
                    } else {
                        setIsMyTemplateFetchError(true);
                    }
                })
            getRecommendedTemplateSearch(searchWord)
                .then((response) => {
                    if (response.suggestions) {
                        setSearched(true);
                        setRecommendationSearchResult(response.suggestions);
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.data.detail === 'No suggestions found') {
                        setSearched(true);
                        setRecommendationSearchResult([]);
                    } else {
                        setIsRecommendedTemplateFetchError(true);
                    }
                })

            if (isMyTemplateFetchError || isRecommendedTemplateFetchError) {
                useModal.openModal();
                setSearched(false);
                setIsMyTemplateFetchError(false);
                setIsRecommendedTemplateFetchError(false);
            }
        }
    }

    const store = useBoundStore();
    const [searchValue, setSearchValue] = useState('');
    const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearched(false);
        setSearchValue(e.target.value);
    }
    const [searched, setSearched] = useState<boolean>(false);
    const [myTemplateSearchResult, setMyTemplateSearchResult] = useState<TemplateDetailTypeArray>([]);
    const [recommendationSearchResult, setRecommendationSearchResult] = useState<TemplateDetailTypeArray>([]);

    const [searchHistory, setSearchHistory] = useState<Array<TemplateSearchHistory>>([]);
    useEffect(() => {
        const arr = store.recentSearchList.sort((a, b) => b.index - a.index)
        setSearchHistory(arr);
    }, [store.recentSearchList]);
    const onClickDelete = (index: number) => {
        const toBeDeleted = searchHistory.findIndex((value) => value.index === index);
        searchHistory.splice(toBeDeleted, 1);
        store.setRecentSearchList(searchHistory);
    }
    return (
        <div className={styles.container}>
            <div className={styles['search-header']}>
                <Image
                    src="/icon/arrow_back.png"
                    width={24}
                    height={24}
                    alt="arrow-icon"
                    className="cp"
                    onClick={onClickGoBack}
                />
                <input value={searchValue} className={styles['search-input']} placeholder="찾으시는 글을 입력해주세요"
                       onChange={onSearchInput} onFocus={onFocusInput} onKeyUp={onPressKey}/>
                <Image
                    src="/icon/search.png"
                    width={22}
                    height={22}
                    alt="search-icon"
                    className="cp"
                    onClick={() => onClickSearch(searchValue)}
                />
            </div>
            <div className={styles['search-list--container']}>
                {searched ? <SearchResult myData={myTemplateSearchResult} recommendedData={recommendationSearchResult} keyword={searchValue} /> :
                    <>
                        <div className="body-3 weight-700 pd-20">최근 검색어</div>
                        <div className={`scrollbar ${styles['recent-search--wrap']}`}>
                            {store.recentSearchList.length === 0 ?
                                <div className="gr-40 label-1 weight-500 center pd-top-15">
                                    최근 검색어가 없습니다.
                                </div> :
                                <div>
                                    {searchHistory.map((item: TemplateSearchHistory, index: number) => {
                                        return (
                                            <div key={index}>
                                                <RecentSearchList data={item} onClickSearch={() => onClickSearch(item.item)} onClickDelete={onClickDelete} />
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                        </div>
                    </>}
            </div>
        </div>
    );
}

export default TemplateSearchPage;