'use client'
import React, {useEffect, useState} from "react";
import {useBoundStore} from "@/src/store/stores";
import LayoutWrapper from "@/src/app/LayoutWrapper";
import MainPage from "@/src/app/_main/MainPage";

import Onboarding from "@/src/components/onboarding/Onboarding";

export default function Home() {
    const store = useBoundStore();
    const resetAllDataStatus = () => {
        store.resetSelectProcess();
    }
    useEffect(() => {
        resetAllDataStatus();
    }, []);
    let element;
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        element = document.getElementById('overlay');
        if (element) {
            element.addEventListener('transitionend', () => {
                if (store.isMainPage === false) {
                    setShowOverlay(true);
                } else {
                    setShowOverlay(false);
                }
            });
            element.addEventListener('transitionstart', () => {
                if (showOverlay && store.isMainPage) {
                    setShowOverlay(false);
                }
            });
        }
    }, [element, store.isMainPage, showOverlay]);

    return (
        <>
            {store.onboardingShow && !store.nickname ? <Onboarding /> :
                <LayoutWrapper>
                    <MainPage/>
                </LayoutWrapper>}
        </>
    );
}
