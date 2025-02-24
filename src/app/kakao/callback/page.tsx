'use client'
import React, {useEffect} from 'react';
import {getKakaoProfile} from "@/src/api/auth";
import {useBoundStore} from "@/src/store/stores";
import {useRouter} from "next/navigation";
import {KaKaoProfile} from "@/src/type/auth";

function KakaoRedirectPage() {
    const store = useBoundStore();
    const router = useRouter();

    useEffect(() => {
        if (window) {
            const code = window.location.search.split('=')[1];
            getKakaoProfile(code).then((data: KaKaoProfile) => {
                store.setToken(data['access_token']);
                store.setNickname(data['nickname']);
                store.setProfile(data['thumbnail_image']);

                router.push('/');
            }).catch((e) => {
                // TODO 에러처리 공통 ui 요청
                console.log('page e', e);
            })
        }
    }, [window])

    return (
        <div>
            로딩 ui
        </div>
    );
}

export default KakaoRedirectPage;