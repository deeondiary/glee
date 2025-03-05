'use client'
import React from 'react';
import LayoutWrapper from "@/src/app/LayoutWrapper";
import styles from './layout.module.css'
import {PATH_NO_HEADERS} from "@/src/enum/path";
import {usePathname} from "next/navigation";
import {useUiStore} from "@/src/store/ui-store";
import SuggestionLoading from "@/src/app/suggestion/_component/SuggestionLoading";

function SuggestionLayout(props: { children?: React.ReactNode }) {
    const pathname = usePathname();
    const uiStore = useUiStore();
    return (
        <>
            {uiStore.isSuggestionLoading && <SuggestionLoading type={uiStore.suggestionLoadingState}/>}
            <LayoutWrapper>
                <div className={styles.container}
                     style={{paddingTop: PATH_NO_HEADERS.includes(pathname) ? '0' : ''}}>
                    {props.children}
                </div>
            </LayoutWrapper>
        </>
    );
}

export default SuggestionLayout;